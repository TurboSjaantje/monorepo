import { Component, OnInit } from '@angular/core';
import { map, Observable, Subscription, tap } from 'rxjs';
import { User } from '../login/login.model';
import { LoginService } from '../login/login.service';
import { Token } from '../login/token.decorator';
import { Teacher } from '../teacher/teacher.model';
import { TeacherService } from '../teacher/teacher.service';

@Component({
  selector: 'zondagschoolapp-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})

export class UserComponent implements OnInit {

  teacher: Teacher | undefined;
  subscription: Subscription | undefined;

  constructor(private teacherService: TeacherService) { }

  ngOnInit(): void {
    const currentuser = JSON.parse(localStorage.getItem('currentuser')!);
    let emailaddress = currentuser.emailaddress;

    this.subscription = this.teacherService.getTeacherById(emailaddress).subscribe((response) => {
      this.teacher = response;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      console.log("unsubscribing");
      this.subscription.unsubscribe();
    }
  }
}
