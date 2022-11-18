import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Teacher } from '../../models/teacher.model';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'zondagschoolapp-update-teacher',
  templateUrl: './update-teacher.component.html',
  styleUrls: ['./update-teacher.component.css'],
})
export class UpdateTeacherComponent implements OnInit {

  teacherId: string | null | undefined;
  teacher: Teacher | undefined;

  teacherForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', Validators.required]
  });

  constructor(private teacherService: TeacherService, private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.teacherId = params.get("id");
      if (this.teacherId) {
        console.log("teacher exists with id: " + this.teacherId);
        this.teacher = this.teacherService.getTeacherById(this.teacherId);

        this.teacherForm.patchValue({
          username: this.teacher.username,
          email: this.teacher.email
        });
      } else {
        console.log("teacher does not exist with id: " + this.teacherId);
      }
    })
  }

  updateTeacher() {
    let username = this.teacherForm.value.username;
    let email = this.teacherForm.value.email;

    if (username && email && this.teacher) {
      this.teacherService.updateTeacher(this.teacher, new Teacher(username, email));
    }
  }

}
