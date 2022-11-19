import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Teacher } from '../../models/teacher.model';
import { TeacherService } from '../teacher.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'zondagschoolapp-create-teacher',
  templateUrl: './create-teacher.component.html',
  styleUrls: ['./create-teacher.component.css'],
})
export class CreateTeacherComponent implements OnInit {

  teacherForm = this.fb.group({
    emailAddress: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    birthDate: ['', Validators.required],
    city: ['', Validators.required],
    street: ['', Validators.required],
    houseNumber: [0, Validators.required],
    postalCode: ['', Validators.required]
  });

  constructor(private teacherService: TeacherService, private fb: FormBuilder) {

  }

  ngOnInit(): void {
  }

  createTeacher() {
    let emailAddress = this.teacherForm.value.emailAddress;
    let firstName = this.teacherForm.value.firstName;
    let lastName = this.teacherForm.value.lastName;
    let birthDate = this.teacherForm.value.birthDate;
    let city = this.teacherForm.value.city;
    let street = this.teacherForm.value.street;
    let houseNumber = this.teacherForm.value.houseNumber;
    let postalCode = this.teacherForm.value.postalCode;

    if (emailAddress && firstName && lastName && birthDate && city && street && houseNumber && postalCode) {
      this.teacherService.createTeacher(new Teacher(emailAddress, firstName, lastName, new Date(birthDate), city, street, houseNumber, postalCode));
    }

    this.teacherForm.reset();
  }
}
