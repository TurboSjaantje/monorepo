import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClassService } from '../../class/class.service';
import { Subject } from '../../class/subject.model';
import { Student } from '../student.model';
import { StudentService } from '../student.service';

export class dataListItem {
  id: string | undefined;
  subject: string | undefined;
  isChecked: boolean | undefined;

  constructor(id: string, subject: string, isChecked: boolean) {
    this.id = id;
    this.subject = subject;
    this.isChecked = isChecked;
  }
}

@Component({
  selector: 'zondagschoolapp-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css'],
})
export class UpdateStudentComponent implements OnInit {

  //Checklist
  checkboxesDataList: dataListItem[] = [];
  selectedItemsList: dataListItem[] = [];
  checkedIDs: any = [];

  allClasses: Subject[] = [];
  studentId: string | undefined | null;
  student: Student | undefined;
  dateNow = new Date(Date.now()).toISOString().split("T")[0]

  studentForm: FormGroup | undefined;

  constructor(private fb: FormBuilder, private classService: ClassService, private studentService: StudentService, private activatedRoute: ActivatedRoute, @Inject(LOCALE_ID) public locale: string) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.studentId = params.get('id');
      if (this.studentId) {

        //Get Class options
        let classSubscription = this.classService.getAllClasses().subscribe((res) => {
          this.allClasses = res;

          for (let c of this.allClasses) {
            this.checkboxesDataList.push(new dataListItem(c._id!, c.name!, false))
          }

          this.studentForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            birthDate: ['', Validators.required],
            city: ['', Validators.required],
            street: ['', Validators.required],
            houseNumber: [0, Validators.required],
            postalCode: new FormControl('', [Validators.required, Validators.pattern(/^[1-9][0-9]{3}[\s][A-Za-z]{2}$/i)]),
          })

          //Get Student information
          console.log(this.studentId)
          let studentSubscription = this.studentService.getStudentById(this.studentId!).subscribe((res) => {
            this.student = res;

            console.log(this.student.inclass)
            console.log(this.allClasses)
            console.log(this.student)

            let birthdate = (formatDate(this.student!.birthdate!, 'yyyy-MM-dd', this.locale));
            console.log(birthdate)
            this.studentForm!.patchValue({
              firstName: this.student.firstname,
              lastName: this.student.lastname,
              birthDate: birthdate,
              city: this.student.city,
              street: this.student.street,
              houseNumber: this.student.housenumber,
              postalCode: this.student.postalcode,
              inclass: this.student.inclass
            })
            this.setSelectedItems(this.student?.inclass!);
            this.fetchSelectedItems();
            this.fetchCheckedIDs();

            studentSubscription.unsubscribe();
          })
          classSubscription.unsubscribe();
        })

      }
    });
  }

  updateStudent() {
    console.log('updateStudent() called!');

    let selectedClasses: string[] = [];
    for (let i of this.selectedItemsList) selectedClasses.push(i.id!);

    let student = new Student(
      this.studentForm!.value.firstName!,
      this.studentForm!.value.lastName!,
      new Date(this.studentForm!.value.birthDate!),
      this.studentForm!.value.city!,
      this.studentForm!.value.street!,
      this.studentForm!.value.houseNumber!,
      this.studentForm!.value.postalCode!,
      selectedClasses,
    )
    console.log(student);
    this.studentService.updateStudent(this.studentId!, student);
  }

  changeSelection() {
    this.fetchSelectedItems()
  }

  fetchSelectedItems() {
    this.selectedItemsList = this.checkboxesDataList.filter((value, index) => {
      return value.isChecked
    });
  }

  setSelectedItems(classes: string[]) {
    for (let c of classes) {
      for (let item of this.checkboxesDataList) {
        if (item.id == c) item.isChecked = true;
      }
    }
  }

  fetchCheckedIDs() {
    this.checkedIDs = []
    this.checkboxesDataList.forEach((value, index) => {
      if (value.isChecked) {
        this.checkedIDs.push(value.id);
      }
    });
  }
}
