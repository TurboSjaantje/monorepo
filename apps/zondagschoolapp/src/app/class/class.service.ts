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
  BASE_URL = environment.apiUrl;
  NEO_URL = environment.neoUrl;

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
      this.createClassInNeo(response)
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

  createClassInNeo(newClass: Subject) {
    console.log('Nieuwe Class voor neo: ' + newClass._id)
    let url = this.NEO_URL + '/neo-api/subject/' + newClass._id;
    console.log(url)
    this.http.get<any>(url).subscribe((response) => {
      console.log(response);
    })
  }
}
