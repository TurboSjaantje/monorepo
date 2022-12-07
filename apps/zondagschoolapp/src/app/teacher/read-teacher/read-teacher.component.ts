import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
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

  subscription: Subscription | undefined;

  constructor(
    private teacherService: TeacherService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.teacherId = params.get("id");
      if (this.teacherId) {
        console.log("teacher exists with id: " + this.teacherId);

        this.subscription = this.teacherService.getTeacherById(this.teacherId).subscribe((response) => {
          this.teacher = response;
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
}
