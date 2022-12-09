import { formatDate } from '@angular/common';
import { Component, OnInit, LOCALE_ID, Inject, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Teacher } from '../teacher.model';
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
  dateNow = new Date(Date.now()).toISOString().split("T")[0];

  subscription: Subscription | undefined;

  teacherForm: FormGroup = new FormGroup('');

  constructor(private teacherService: TeacherService, private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router, @Inject(LOCALE_ID) public locale: string) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.teacherEmailAddress = params.get("id");
      if (this.teacherEmailAddress) {
        console.log("teacher exists with email: " + this.teacherEmailAddress);
        this.subscription = this.teacherService.getTeacherById(this.teacherEmailAddress).subscribe((response) => {
          this.teacher = response;
          this.teacherBirthDate = (formatDate(this.teacher!.birthdate!, 'yyyy-MM-dd', this.locale));
          console.log(this.teacherBirthDate);
          this.teacherForm.patchValue({
            emailAddress: this.teacher.emailaddress,
            firstName: this.teacher.firstname,
            lastName: this.teacher.lastname,
            birthDate: this.teacherBirthDate,
            city: this.teacher.city,
            street: this.teacher.street,
            houseNumber: this.teacher.housenumber?.toString(),
            postalCode: this.teacher.postalcode
          });
        });

        this.teacherForm = this.fb.group({
          emailAddress: new FormControl('', [Validators.required, Validators.email]),
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          birthDate: ['', Validators.required],
          city: ['', Validators.required],
          street: ['', Validators.required],
          houseNumber: ['', Validators.required],
          postalCode: new FormControl('', [Validators.required, Validators.pattern(/^[1-9][0-9]{3}[\s][A-Za-z]{2}$/i)])
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

  ngOnDestroy(): void {
    if (this.subscription) {
      console.log("unsubscribing");
      this.subscription.unsubscribe();
    }
  }
}
