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
      emailAddress: "MarliesvanderHoek@armyspy.com",
      firstName: "Marlies",
      lastName: "van der Hoek",
      birthDate: new Date(1964, 9, 6),
      city: "Amsterdam",
      street: "Schaepmanstraat",
      houseNumber: 84,
      postalCode: "1051 JJ"
    },
    {
      emailAddress: "HelenevanderKamp@armyspy.com",
      firstName: "Helene",
      lastName: "van der Kamp",
      birthDate: new Date(1970, 7, 24),
      city: "Waspik",
      street: "Van Gentstraat",
      houseNumber: 87,
      postalCode: "5165 CV"
    },
    {
      emailAddress: "BobbyVerbeet@armyspy.com",
      firstName: "Bobby",
      lastName: "Verbeet",
      birthDate: new Date(1965, 2, 10),
      city: "Velp",
      street: "Alteveer",
      houseNumber: 68,
      postalCode: "6881 BG"
    },
    {
      emailAddress: "JanneterBrugge@armyspy.com",
      firstName: "Janne",
      lastName: "ter Brugge",
      birthDate: new Date(1968, 1, 24),
      city: "Geleen",
      street: "Hoge Kanaalweg",
      houseNumber: 27,
      postalCode: "6167 RJ"
    },
    {
      emailAddress: "IrenaMolenkamp@teleworm.us",
      firstName: "Irena",
      lastName: "Molenkamp",
      birthDate: new Date(19676, 2, 12),
      city: "Gorredijk",
      street: "Watse Eelkesstrjitte",
      houseNumber: 75,
      postalCode: "8401 RG"
    },
  ]

  constructor() {
    console.log("TeacherService created");
  }

  getAllTeachers(): Teacher[] {
    return this.teachers;
  }

  getTeacherById(teacherEmail: string): Teacher {
    return this.teachers.filter(t => t.emailAddress == teacherEmail)[0];
  }

  createTeacher(newTeacher: Teacher) {
    if (this.teachers.filter(t => t.emailAddress == newTeacher.emailAddress)[0] == null){
      this.teachers.push(newTeacher);
    } else {
      console.log("error");
    }
  }

  updateTeacher(oldTeacher: Teacher, newTeacher: Teacher) {
    for (const teacher of this.teachers) {
      if (teacher.emailAddress == oldTeacher.emailAddress) {
        teacher.emailAddress = newTeacher.emailAddress;
        teacher.firstName = newTeacher.firstName;
        teacher.lastName = newTeacher.lastName;
        teacher.birthDate = newTeacher.birthDate;
        teacher.city = newTeacher.city;
        teacher.street = newTeacher.street;
        teacher.houseNumber = newTeacher.houseNumber;
        teacher.postalCode = newTeacher.postalCode;
      }
    }
  }

  deleteTeacher(teacher: Teacher) {
    const teacherIndex = this.teachers.findIndex(t => t.emailAddress === teacher.emailAddress);
    this.teachers.splice(teacherIndex, 1);
  }

}
