import { Injectable } from '@angular/core';
import { UnsubscriptionErrorCtor } from 'rxjs/internal/util/UnsubscriptionError';
import { arrayBuffer } from 'stream/consumers';
import { Teacher } from '../models/teacher.model';

@Injectable({
  providedIn: 'root'
})

export class TeacherService {

  teachers: Teacher[] = [
    {
      id: "12345-123-12",
      username: "robinschellius",
      email: "r.schellius@avans.nl"
    },
    {
      id: "12345-123-13",
      username: "dionkoeze",
      email: "d.koeze@avans.nl"
    },
    {
      id: "12345-123-14",
      username: "eefjegijzen",
      email: "e.gijzen@avans.nl"
    },
  ]

  constructor() {
    console.log("TeacherService created");
  }

  getAllTeachers(): Teacher[] {
    return this.teachers;
  }

  getTeacherById(teacherid: string): Teacher {
    return this.teachers.filter(t => t.id == teacherid)[0];
  }

  createTeacher(newTeacher: Teacher) {
    newTeacher.id = this.getRandomInt(11111, 99999) + "-"
      + this.getRandomInt(111, 999) + "-"
      + this.getRandomInt(11, 99);

    while (this.teachers.filter(t => t.id == newTeacher.id)[0] != null) {
      newTeacher.id = this.getRandomInt(11111, 99999) + "-"
        + this.getRandomInt(111, 999) + "-"
        + this.getRandomInt(11, 99);
    }

    this.teachers.push(newTeacher);
  }
  
  updateTeacher(oldTeacher: Teacher, newTeacher: Teacher) {
    for (const teacher of this.teachers) {
      if (teacher.id == oldTeacher.id) {
        teacher.email = newTeacher.email;
        teacher.username = newTeacher.username;
      }
    }
  }

  deleteTeacher(teacher: Teacher) {
    const teacherIndex = this.teachers.findIndex(t => t.id === teacher.id);
    this.teachers.splice(teacherIndex, 1);
  }

  getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

}
