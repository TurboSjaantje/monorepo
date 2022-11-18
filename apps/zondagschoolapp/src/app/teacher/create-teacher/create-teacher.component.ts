import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Teacher } from '../../models/teacher.model';
import { TeacherService } from '../teacher.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'zondagschoolapp-create-teacher',
  templateUrl: './create-teacher.component.html',
  styleUrls: ['./create-teacher.component.css'],
})
export class CreateTeacherComponent implements OnInit {

  teacherForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', Validators.required]
  });

  constructor(private teacherService: TeacherService, private fb: FormBuilder) {

  }

  ngOnInit(): void {

  }

  createTeacher() {
    let username = this.teacherForm.value.username;
    let email = this.teacherForm.value.email;

    if (username != null && email != null) {
      this.teacherService.createTeacher(new Teacher(username, email));
    }

    this.teacherForm.reset();
  }
}
