import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Teacher } from '../../models/teacher.model';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'zondagschoolapp-update-teacher',
  templateUrl: './update-teacher.component.html',
  styleUrls: ['./update-teacher.component.css'],
})
export class UpdateTeacherComponent implements OnInit {

  teacherEmailAddress: string | null | undefined;
  teacher: Teacher | undefined;
  teacherBirthDate: string | undefined;

  teacherForm: FormGroup = new FormGroup('');

  constructor(private teacherService: TeacherService, private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.teacherEmailAddress = params.get("id");
      if (this.teacherEmailAddress) {
        console.log("teacher exists with email: " + this.teacherEmailAddress);
        this.teacher = this.teacherService.getTeacherById(this.teacherEmailAddress);
        this.teacherBirthDate = this.teacher.birthDate?.toISOString().split("T")[0];
        console.log(this.teacherBirthDate);

        this.teacherForm = this.fb.group({
          emailAddress: ['', Validators.required],
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          birthDate: ['', Validators.required],
          city: ['', Validators.required],
          street: ['', Validators.required],
          houseNumber: ['', Validators.required],
          postalCode: ['', Validators.required]
        });

        this.teacherForm.patchValue({
          emailAddress: this.teacher.emailAddress,
          firstName: this.teacher.firstName,
          lastName: this.teacher.lastName,
          birthDate: this.teacherBirthDate,
          city: this.teacher.city,
          street: this.teacher.street,
          houseNumber: this.teacher.houseNumber?.toString(),
          postalCode: this.teacher.postalCode
        });

      } else {
        console.log("teacher does not exist with email address: " + this.teacherEmailAddress);
      }
    })
  }

  updateTeacher() {
    let emailAddress = this.teacherForm.value.emailAddress;
    let firstName = this.teacherForm.value.firstName;
    let lastName = this.teacherForm.value.lastName;
    let birthDate = this.teacherForm.value.birthDate;
    let city = this.teacherForm.value.city;
    let street = this.teacherForm.value.street;
    let houseNumber = this.teacherForm.value.houseNumber;
    let postalCode = this.teacherForm.value.postalCode;

    console.log(birthDate);

    if (emailAddress && firstName && lastName && birthDate && city && street && houseNumber && postalCode && this.teacher) {
      this.teacherService.updateTeacher(this.teacher, new Teacher(emailAddress, firstName, lastName, new Date(birthDate), city, street, Number.parseInt(houseNumber), postalCode));
    }
  }

}
