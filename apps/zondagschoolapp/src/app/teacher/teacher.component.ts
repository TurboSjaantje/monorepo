import { Component, OnInit } from '@angular/core';
import { Teacher } from './teacher.model';
import { TeacherService } from './teacher.service';

@Component({
  selector: 'zondagschoolapp-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css'],
})
export class TeacherComponent implements OnInit {
  teachers: Teacher[] | undefined;

  constructor(private teacherService: TeacherService) { }

  ngOnInit(): void {
    this.teachers = this.teacherService.getAllTeachers();
    console.log(this.teachers.length + " teachers found.");
  }
}
