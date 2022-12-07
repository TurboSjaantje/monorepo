import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, Subscription, tap } from 'rxjs';
import { User } from '../../login/login.model';
import { Token } from '../../login/token.decorator';
import { UserService } from '../../user/user.service';
import { Teacher } from '../teacher.model';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'zondagschoolapp-read-teacher',
  templateUrl: './read-teacher.component.html',
  styleUrls: ['./read-teacher.component.css'],
})

export class ReadTeacherComponent implements OnInit {

  teacherId: string | null | undefined;
  teacher: Teacher | undefined;
  teacherBirthDate: string | undefined;

  user: User | undefined;
  userExists: boolean = false;

  subscription: Subscription | undefined;

  createLoginForm = this.formBuilder.group({
    emailaddress: ['', Validators.required],
    password: ['', Validators.required],
    admin: [false]
  })

  constructor(private teacherService: TeacherService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.teacherId = params.get("id");
      if (this.teacherId) {
        console.log("teacher exists with id: " + this.teacherId);

        this.subscription = this.teacherService.getTeacherById(this.teacherId).subscribe(async (response) => {
          this.teacher = response;
          this.createLoginForm.patchValue({
            emailaddress: this.teacher.emailaddress,
          })
          this.user = await this.checkIfUserExists(this.teacher.emailaddress!);
        });

        if (this.teacher)
          this.teacherBirthDate = this.teacher.birthdate?.toISOString().split("T")[0];


      } else {
        console.log("teacher does not exist with id: " + this.teacherId);
      }
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      console.log("unsubscribing");
      this.subscription.unsubscribe();
    }
  }

  async checkIfUserExists(email: string) {
    let user;
    this.userService.getUserById(email).subscribe((response) => {
      user = response;
      console.log(response);
      this.userExists = (response != null);
    })
    return user;
  }

  async createUserLogin() {
    if (this.createLoginForm.value.password != null) {
      this.userService.addUser(this.createLoginForm.value.emailaddress!, this.createLoginForm.value.password, this.createLoginForm.value.admin!);
    }
    this.userExists = true;
    await this.router.navigate(['/teacher/' + this.teacher?.emailaddress])
  }
}
