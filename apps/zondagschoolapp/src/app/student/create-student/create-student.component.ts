import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
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
  selector: 'zondagschoolapp-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css'],
})

export class CreateStudentComponent implements OnInit {
  //Checklist
  checkboxesDataList: dataListItem[] = [];
  selectedItemsList: dataListItem[] = [];
  checkedIDs: any = [];

  classes: Subject[] | undefined;
  dateNow = new Date(Date.now()).toISOString().split("T")[0]

  studentForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    birthDate: ['', Validators.required],
    city: ['', Validators.required],
    street: ['', Validators.required],
    houseNumber: [0, Validators.required],
    postalCode: new FormControl('', [Validators.required, Validators.pattern(/^[1-9][0-9]{3}[\s][A-Za-z]{2}$/i)]),
  })

  constructor(private fb: FormBuilder, private studentService: StudentService, private classService: ClassService) { }

  ngOnInit(): void {
    let subscription = this.classService.getAllClasses().subscribe((res) => {

      this.classes = res;
      for (let c of this.classes) {
        this.checkboxesDataList.push(new dataListItem(c._id!, c.name!, false))
      }

      let date = new Date(Date.now()).toISOString().split("T")[0];
      this.studentForm.patchValue({
        birthDate: date
      })

      this.fetchSelectedItems();
      this.fetchCheckedIDs();

      subscription.unsubscribe();
    })
  }

  createStudent() {
    console.log('createStudent() called!');

    let selectedClasses: string[] = [];
    for (let i of this.selectedItemsList) selectedClasses.push(i.id!);

    let student = new Student(
      this.studentForm.value.firstName!,
      this.studentForm.value.lastName!,
      new Date(this.studentForm.value.birthDate!),
      this.studentForm.value.city!,
      this.studentForm.value.street!,
      this.studentForm.value.houseNumber!,
      this.studentForm.value.postalCode!,
      selectedClasses,
    )
    this.studentService.createStudent(student);
  }

  //Checklist logic
  changeSelection() {
    this.fetchSelectedItems()
  }

  fetchSelectedItems() {
    this.selectedItemsList = this.checkboxesDataList.filter((value, index) => {
      return value.isChecked
    });
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
