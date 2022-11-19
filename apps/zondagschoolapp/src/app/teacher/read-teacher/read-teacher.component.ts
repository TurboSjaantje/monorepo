import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Teacher } from '../../models/teacher.model';
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
        this.teacher = this.teacherService.getTeacherById(this.teacherId);
        this.teacherBirthDate = this.teacher.birthDate?.toDateString();
      } else {
        console.log("teacher does not exist with id: " + this.teacherId);
      }
    })
  }

}
