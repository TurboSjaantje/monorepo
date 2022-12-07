import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Teacher } from '../teacher.model';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'zondagschoolapp-delete-teacher',
  templateUrl: './delete-teacher.component.html',
  styleUrls: ['./delete-teacher.component.css'],
})

export class DeleteTeacherComponent implements OnInit {

  teacherId: string | null | undefined;
  teacher: Teacher | undefined;
  teacherBirthDate: string | undefined;
  subscription: Subscription | undefined;

  constructor(private teacherService: TeacherService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.teacherId = params.get("id");
      if (this.teacherId) {
        console.log("teacher exists with id: " + this.teacherId);
        this.subscription = this.teacherService.getTeacherById(this.teacherId).subscribe((response) => {
          this.teacher = response;
        });

        if (this.teacher)
          this.teacherBirthDate = this.teacher.birthdate?.toDateString();
      } else {
        console.log("teacher does not exist with id: " + this.teacherId);
      }
    })
  }

  deleteTeacher() {
    if (this.teacher) {
      this.teacherService.deleteTeacher(this.teacher);
    }
  }

}
