import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ClassService } from '../../class/class.service';
import { Subject } from '../../class/subject.model';
import { Student } from '../student.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'zondagschoolapp-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css'],
})
export class CreateStudentComponent implements OnInit {

  classes: Subject[] | undefined;

  studentForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    birthDate: ['', Validators.required],
    city: ['', Validators.required],
    street: ['', Validators.required],
    houseNumber: [0, Validators.required],
    postalCode: ['', Validators.required],
    inclass: ['']
  })

  constructor(private fb: FormBuilder, private studentService: StudentService, private classService: ClassService) { }

  ngOnInit(): void {
    let subscription = this.classService.getAllClasses().subscribe((res) => {
      this.classes = res;
      let date = new Date(Date.now()).toISOString().split("T")[0];
      this.studentForm.patchValue({
        birthDate: date
      })
      subscription.unsubscribe();
    })
  }

  createStudent() {
    console.log('createStudent() called!');
    let student = new Student(
      this.studentForm.value.firstName!,
      this.studentForm.value.lastName!,
      new Date(this.studentForm.value.birthDate!),
      this.studentForm.value.city!,
      this.studentForm.value.street!,
      this.studentForm.value.houseNumber!,
      this.studentForm.value.postalCode!,
      this.studentForm.value.inclass!,
    )
    this.studentService.createStudent(student);
  }

}
