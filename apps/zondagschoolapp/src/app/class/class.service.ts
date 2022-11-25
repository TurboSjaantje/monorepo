import { Injectable } from '@angular/core';
import { TeacherService } from '../teacher/teacher.service';
import { Class } from './class.model';
import { Time } from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  classes: Class[] = [
    {
      id: "12345-123-12",
      name: "Bijbelstudie",
      age: 4,
      time: "10:00 AM",
      teachers: this.teacherService.getAllTeachers()
    },
    {
      id: "23456-234-23",
      name: "Bijbelstudie",
      age: 5,
      time: "10:30 AM",
      teachers: this.teacherService.getAllTeachers()
    },
    {
      id: "34567-345-34",
      name: "Bijbelstudie",
      age: 6,
      time: "11:00 AM",
      teachers: this.teacherService.getAllTeachers()
    },
    {
      id: "45678-456-45",
      name: "Bijbelstudie",
      age: 7,
      time: "11:30 AM",
      teachers: this.teacherService.getAllTeachers()
    },
    {
      id: "56789-567-56",
      name: "Bijbelstudie",
      age: 8,
      time: "12:00 AM",
      teachers: this.teacherService.getAllTeachers()
    },
  ]

  constructor(private teacherService: TeacherService) { }
}
