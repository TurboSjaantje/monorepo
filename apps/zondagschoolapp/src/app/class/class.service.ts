import { Injectable } from '@angular/core';
import { TeacherService } from '../teacher/teacher.service';
import { Class } from './class.model';
import { Time } from '@angular/common';
import { DeleteClassComponent } from './delete-class/delete-class.component';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { Subject } from './subject.model';
import { Router } from '@angular/router';
import { subscriptionLogsToBeFn } from 'rxjs/internal/testing/TestScheduler';

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

  BASE_URL = environment.apiUrl;

  constructor(private teacherService: TeacherService, private http: HttpClient, private router: Router) {
    console.log('ClassService created!');
  }

  getAllClasses(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.BASE_URL + '/api/class').pipe(
      map((response: Subject[]) => response),
      tap((classes: Subject[]) => {
        return classes;
      })
    )
  }

  getClassById(classId: string): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.BASE_URL + '/api/class/' + classId).pipe(
      map((response: Subject[]) => response),
      tap((subject: Subject[]) => {
        return subject[0];
      })
    )
  }

  createClass(newClass: Subject, selectedTeachers: string[]) {
    let subject = {
      name: newClass.name,
      age: newClass.age,
      time: newClass.time,
      teachers: selectedTeachers
    }
    console.log(subject);
    this.http.post<any>(this.BASE_URL + '/api/class', subject).subscribe(async (response) => {
      await this.router.navigate(['/class']);
    });
  }

  updateClass(oldClass: Subject, newClass: Subject, selectedTeachers: string[]) {
    let subject = {
      name: newClass.name,
      age: newClass.age,
      time: newClass.time,
      teachers: selectedTeachers
    }
    console.log(subject);
    console.log(oldClass);
    console.log(selectedTeachers)
    this.http.put<any>(this.BASE_URL + '/api/class/' + oldClass._id, subject).subscribe((response) => {
      this.router.navigate(['/class']);
    })
  }

  deleteClass(toDeleteClass: Subject) {
    this.http.delete<any>(this.BASE_URL + '/api/class/' + toDeleteClass._id).subscribe((response) => {
      this.router.navigate(['/class']);
    })
  }

  getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
}
