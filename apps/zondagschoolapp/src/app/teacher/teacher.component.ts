import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { runInThisContext } from 'vm';
import { Teacher } from './teacher.model';
import { TeacherService } from './teacher.service';

@Component({
  selector: 'zondagschoolapp-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css'],
})
export class TeacherComponent implements OnInit {
  teachers: Teacher[] | undefined;
  teachers$: Observable<Teacher[]> | undefined;
  subscription: Subscription | undefined;

  constructor(private teacherService: TeacherService) { }

  ngOnInit(): void {

    //Subscribing to teacher from httpService
    // console.log("subscribing");
    // this.subscription = this.teacherService.getAllTeachers().subscribe((response) => {
    //   this.teachers = response;
    //   console.log(response);
    // })

    this.teachers$ = this.teacherService.getAllTeachers();

    if (this.teachers) console.log(this.teachers.length + " teachers found.");
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      console.log("unsubscribing");
      this.subscription.unsubscribe();
    }
  }
}
