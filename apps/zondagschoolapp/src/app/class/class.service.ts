import { Injectable } from '@angular/core';
import { TeacherService } from '../teacher/teacher.service';
import { Class } from './class.model';
import { Time } from '@angular/common';
import { DeleteClassComponent } from './delete-class/delete-class.component';

@Injectable({
  providedIn: 'root',
})
export class ClassService {
  classes: Class[] = [
    {
      id: '12345-123-12',
      name: 'Bijbelstudie',
      age: 4,
      time: '10:00',
      teachers: [{
        emailaddress: 'MarliesvanderHoek@armyspy.com',
        firstname: 'Marlies',
        lastname: 'van der Hoek',
        birthdate: new Date(1964, 9, 6),
        city: 'Amsterdam',
        street: 'Schaepmanstraat',
        housenumber: 84,
        postalcode: '1051 JJ',
      },
      {
        emailaddress: 'HelenevanderKamp@armyspy.com',
        firstname: 'Helene',
        lastname: 'van der Kamp',
        birthdate: new Date(1970, 7, 24),
        city: 'Waspik',
        street: 'Van Gentstraat',
        housenumber: 87,
        postalcode: '5165 CV',
      },]
    },
    {
      id: '23456-234-23',
      name: 'Bijbelstudie',
      age: 5,
      time: '10:30',
      teachers: [{
        emailaddress: 'MarliesvanderHoek@armyspy.com',
        firstname: 'Marlies',
        lastname: 'van der Hoek',
        birthdate: new Date(1964, 9, 6),
        city: 'Amsterdam',
        street: 'Schaepmanstraat',
        housenumber: 84,
        postalcode: '1051 JJ',
      },
      {
        emailaddress: 'HelenevanderKamp@armyspy.com',
        firstname: 'Helene',
        lastname: 'van der Kamp',
        birthdate: new Date(1970, 7, 24),
        city: 'Waspik',
        street: 'Van Gentstraat',
        housenumber: 87,
        postalcode: '5165 CV',
      },]
    },
    {
      id: '34567-345-34',
      name: 'Bijbelstudie',
      age: 6,
      time: '11:00',
      teachers: [{
        emailaddress: 'MarliesvanderHoek@armyspy.com',
        firstname: 'Marlies',
        lastname: 'van der Hoek',
        birthdate: new Date(1964, 9, 6),
        city: 'Amsterdam',
        street: 'Schaepmanstraat',
        housenumber: 84,
        postalcode: '1051 JJ',
      },
      {
        emailaddress: 'HelenevanderKamp@armyspy.com',
        firstname: 'Helene',
        lastname: 'van der Kamp',
        birthdate: new Date(1970, 7, 24),
        city: 'Waspik',
        street: 'Van Gentstraat',
        housenumber: 87,
        postalcode: '5165 CV',
      },]
    },
    {
      id: '45678-456-45',
      name: 'Bijbelstudie',
      age: 7,
      time: '11:30',
      teachers: [{
        emailaddress: 'MarliesvanderHoek@armyspy.com',
        firstname: 'Marlies',
        lastname: 'van der Hoek',
        birthdate: new Date(1964, 9, 6),
        city: 'Amsterdam',
        street: 'Schaepmanstraat',
        housenumber: 84,
        postalcode: '1051 JJ',
      },
      {
        emailaddress: 'HelenevanderKamp@armyspy.com',
        firstname: 'Helene',
        lastname: 'van der Kamp',
        birthdate: new Date(1970, 7, 24),
        city: 'Waspik',
        street: 'Van Gentstraat',
        housenumber: 87,
        postalcode: '5165 CV',
      },]
    },
    {
      id: '56789-567-56',
      name: 'Bijbelstudie',
      age: 8,
      time: '12:00',
      teachers: [{
        emailaddress: 'MarliesvanderHoek@armyspy.com',
        firstname: 'Marlies',
        lastname: 'van der Hoek',
        birthdate: new Date(1964, 9, 6),
        city: 'Amsterdam',
        street: 'Schaepmanstraat',
        housenumber: 84,
        postalcode: '1051 JJ',
      },
      {
        emailaddress: 'HelenevanderKamp@armyspy.com',
        firstname: 'Helene',
        lastname: 'van der Kamp',
        birthdate: new Date(1970, 7, 24),
        city: 'Waspik',
        street: 'Van Gentstraat',
        housenumber: 87,
        postalcode: '5165 CV',
      },]
    }
  ];

  constructor(private teacherService: TeacherService) {
    console.log('ClassService created!');
  }

  getAllClasses(): Class[] {
    return this.classes;
  }

  getClassById(classId: string): Class {
    return this.classes.filter((c) => c.id == classId)[0];
  }

  createClass(newClass: Class) {
    let idIsValid = false;
    while (!idIsValid) {
      newClass.id =
        this.getRandomInt(11111, 99999) +
        '-' +
        this.getRandomInt(111, 999) +
        '-' +
        this.getRandomInt(11, 99);

      if (this.classes.filter((c) => c.id == newClass.id)[0] == null)
        idIsValid = true;
    }

    try {
      this.classes.push(newClass);
    } catch (error) {
      console.log(error);
    }
  }

  updateClass(oldClass: Class, newClass: Class) {
    for (const c of this.classes) {
      if (c.id == oldClass.id) {
        c.name = newClass.name;
        c.time = newClass.time;
        c.age = newClass.age;
        c.teachers = newClass.teachers;
      }
    }
  }

  deleteClass(toDeleteClass: Class) {
    const classIndex = this.classes.findIndex((c) => c.id === toDeleteClass.id);
    this.classes.splice(classIndex, 1);
  }

  getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
}
