import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Teacher } from '../teacher.model';
import { TeacherService } from '../teacher.service';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TeacherComponent } from '../teacher.component';

@Component({
  selector: 'zondagschoolapp-create-teacher',
  templateUrl: './create-teacher.component.html',
  styleUrls: ['./create-teacher.component.css'],
})

export class CreateTeacherComponent implements OnInit {

  teacherForm = this.fb.group({
    emailAddress: new FormControl('', [Validators.required, Validators.email]),
    firstName: ['', [Validators.required, Validators.maxLength(20)]],
    lastName: ['', [Validators.required, Validators.maxLength(20)]],
    birthDate: ['', Validators.required],
    city: ['', Validators.required],
    street: ['', Validators.required],
    houseNumber: [0, Validators.required],
    postalCode: new FormControl('', [Validators.required, Validators.pattern(/^[1-9][0-9]{3}[\s][A-Za-z]{2}$/i)])
  });

  dateNow = new Date(Date.now()).toISOString().split("T")[0];

  constructor(private teacherService: TeacherService, private fb: FormBuilder, private router: Router) {

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

    this.router.navigate(['/teacher']);
  }

}
