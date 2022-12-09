import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClassService } from '../../class/class.service';
import { Subject } from '../../class/subject.model';
import { Student } from '../student.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'zondagschoolapp-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css'],
})
export class UpdateStudentComponent implements OnInit {

  classes: Subject[] | undefined;
  studentId: string | undefined | null;
  student: Student | undefined;

  studentForm: FormGroup | undefined;

  constructor(private fb: FormBuilder, private classService: ClassService, private studentService: StudentService, private activatedRoute: ActivatedRoute, @Inject(LOCALE_ID) public locale: string) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.studentId = params.get('id');
      if (this.studentId) {

        //Get Class options
        let classSubscription = this.classService.getAllClasses().subscribe((res) => {
          this.classes = res;

          this.studentForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            birthDate: ['', Validators.required],
            city: ['', Validators.required],
            street: ['', Validators.required],
            houseNumber: [0, Validators.required],
            postalCode: ['', Validators.required],
            inclass: ['']
          })

          //Get Student information
          console.log(this.studentId)
          let studentSubscription = this.studentService.getStudentById(this.studentId!).subscribe((res) => {
            this.student = res;

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
            studentSubscription.unsubscribe();
          })

          classSubscription.unsubscribe();
        })

      }
    });
  }

  updateStudent() {
    console.log('updateStudent() called!');
    let student = new Student(
      this.studentForm!.value.firstName!,
      this.studentForm!.value.lastName!,
      new Date(this.studentForm!.value.birthDate!),
      this.studentForm!.value.city!,
      this.studentForm!.value.street!,
      this.studentForm!.value.houseNumber!,
      this.studentForm!.value.postalCode!,
      this.studentForm!.value.inclass!,
    )
    console.log(student);
    this.studentService.updateStudent(this.studentId!, student);
  }
}
