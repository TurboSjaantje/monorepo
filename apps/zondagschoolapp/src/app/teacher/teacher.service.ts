import { Injectable } from '@angular/core';
import { Teacher } from './teacher.model';
import { dataListItem } from '../class/create-class/create-class.component';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from "rxjs";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class TeacherService {

  BASE_URL = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {
    console.log('TeacherService created');
  }

  getAllTeachers(): Observable<Teacher[]> {
    const teacherUrl = this.BASE_URL + "/api/teacher";
    console.log("GET: " + teacherUrl);

    return this.http.get<Teacher[]>(teacherUrl).pipe(
      map((response: Teacher[]) => response),
      tap((teachers: Teacher[]) => {
        return teachers;
      })
    );
  }

  getTeacherById(teacherEmail: string): Observable<Teacher> {
    const teacherUrl = this.BASE_URL + "/api/teacher/" + teacherEmail;
    console.log("GET: " + teacherUrl);

    return this.http.get<Teacher>(teacherUrl).pipe(
      map((response: Teacher) => response),
      tap((teacher: Teacher) => {
        return teacher;
      })
    );
  }

  getMultipleTeachersById(teacherIds: string[] | undefined): Observable<Teacher[]> {
    return this.http.post<Teacher[]>(this.BASE_URL + '/api/teacher/multiple', teacherIds).pipe(
      map((response: Teacher[]) => response),
      tap((teachers: Teacher[]) => {
        return teachers;
      })
    )
  }

  createTeacher(newTeacher: Teacher) {
    let teacherExists;
    let subscription = this.getTeacherById(newTeacher.emailaddress!).subscribe((response) => {
      teacherExists = response;
    })
    subscription.unsubscribe();
    if (!teacherExists) {
      const teacherUrl = this.BASE_URL + "/api/teacher";
      console.log("POST: " + teacherUrl);
      let response;
      this.http.post<Teacher>(teacherUrl, newTeacher).subscribe((response) => {
        response = response;
        this.router.navigate(['/teacher']);
      });
      console.log(response)
    } else {
      console.log("Teacher with emailaddress: " + newTeacher.emailaddress + " already exists!");
    }
  }

  updateTeacher(oldTeacher: Teacher, newTeacher: Teacher) {
    const teacherUrl = this.BASE_URL + "/api/teacher/" + oldTeacher.emailaddress;
    console.log("PUT: " + teacherUrl);
    let response;
    this.http.put<Teacher>(teacherUrl, newTeacher).subscribe((response) => {
      response = response;
    });
    console.log(response)
  }

  deleteTeacher(teacher: Teacher) {
    if (teacher) {
      const teacherUrl = this.BASE_URL + "/api/teacher/" + teacher.emailaddress;
      console.log("DELETE: " + teacherUrl);

      let deletedTeacher;
      this.http.delete(teacherUrl).subscribe((response) => {
        deletedTeacher = response;
      })
      console.log(JSON.stringify(deletedTeacher));
    }
  }
}
