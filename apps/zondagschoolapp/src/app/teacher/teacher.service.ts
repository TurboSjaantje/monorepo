import { Injectable } from '@angular/core';
import { Teacher } from './teacher.model';
import { dataListItem } from '../class/create-class/create-class.component';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from "rxjs";

@Injectable({
  providedIn: 'root',
})

export class TeacherService {

  BASE_URL = environment.apiUrl;

  teachers: Teacher[] = [
    {
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
    },
    {
      emailaddress: 'BobbyVerbeet@armyspy.com',
      firstname: 'Bobby',
      lastname: 'Verbeet',
      birthdate: new Date(1965, 2, 10),
      city: 'Velp',
      street: 'Alteveer',
      housenumber: 68,
      postalcode: '6881 BG',
    },
    {
      emailaddress: 'JanneterBrugge@armyspy.com',
      firstname: 'Janne',
      lastname: 'ter Brugge',
      birthdate: new Date(1968, 1, 24),
      city: 'Geleen',
      street: 'Hoge Kanaalweg',
      housenumber: 27,
      postalcode: '6167 RJ',
    },
    {
      emailaddress: 'IrenaMolenkamp@teleworm.us',
      firstname: 'Irena',
      lastname: 'Molenkamp',
      birthdate: new Date(19676, 2, 12),
      city: 'Gorredijk',
      street: 'Watse Eelkesstrjitte',
      housenumber: 75,
      postalcode: '8401 RG',
    },
  ];

  constructor(private http: HttpClient) {
    console.log('TeacherService created');
  }

  getAllTeachers(): Observable<Teacher[]> {
    const teacherUrl = this.BASE_URL + "/teacher";
    console.log("GET: " + teacherUrl);

    return this.http.get<Teacher[]>(teacherUrl).pipe(
      map((response: Teacher[]) => response),
      tap((teachers: Teacher[]) => {
        return teachers;
      })
    );
  }

  getTeacherById(teacherEmail: string): Observable<Teacher> {
    const teacherUrl = this.BASE_URL + "/teacher/" + teacherEmail;
    console.log("GET: " + teacherUrl);

    return this.http.get<Teacher>(teacherUrl).pipe(
      map((response: Teacher) => response),
      tap((teacher: Teacher) => {
        return teacher;
      })
    );
  }

  getMultipleTeachersById(teacherIds: dataListItem[]): Teacher[] {
    let returnTeachers: Teacher[] = [];
    for (let teacher of teacherIds) {
      returnTeachers.push(this.teachers.filter(t => t.emailaddress == teacher.id)[0]);
    }
    return returnTeachers;
  }

  createTeacher(newTeacher: Teacher) {
    let teacherExists;
    let subscription = this.getTeacherById(newTeacher.emailaddress!).subscribe((response) => {
      teacherExists = response;
    })
    subscription.unsubscribe();
    if (!teacherExists) {
      const teacherUrl = this.BASE_URL + "/teacher";
      console.log("POST: " + teacherUrl);
      let response;
      this.http.post<Teacher>(teacherUrl, newTeacher).subscribe((response) => {
        response = response;
      });
      console.log(response)
    } else {
      console.log("Teacher with emailaddress: " + newTeacher.emailaddress + " already exists!");
    }
  }

  updateTeacher(oldTeacher: Teacher, newTeacher: Teacher) {
    const teacherUrl = this.BASE_URL + "/teacher/" + oldTeacher.emailaddress;
    console.log("PUT: " + teacherUrl);
    let response;
    this.http.put<Teacher>(teacherUrl, newTeacher).subscribe((response) => {
      response = response;
    });
    console.log(response)
  }

  deleteTeacher(teacher: Teacher) {
    if (teacher) {
      const teacherUrl = this.BASE_URL + "/teacher/" + teacher.emailaddress;
      console.log("DELETE: " + teacherUrl);
      let deletedTeacher;
      this.http.delete(teacherUrl).subscribe((response) => {
        deletedTeacher = response;
      })
      console.log(deletedTeacher);
    }
  }
}
