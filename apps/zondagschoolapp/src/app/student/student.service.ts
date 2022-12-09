import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Student } from './student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  BASE_URL = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) { }

  getAllStudent() {
    return this.http.get<Student[]>(this.BASE_URL + '/api/student').pipe(
      map((res: Student[]) => res),
      tap((students: Student[]) => {
        return students;
      })
    )
  }

  getStudentById(id: string) {
    return this.http.get<Student>(this.BASE_URL + '/api/student/' + id).pipe(
      map((res: Student) => res),
      tap((student: Student) => {
        return student;
      })
    )
  }

  getStudentsForClass(id: string) {
    return this.http.get<Student[]>(this.BASE_URL + '/api/student/class/' + id).pipe(
      map((res: Student[]) => res),
      tap((students: Student[]) => {
        return students;
      })
    )
  }

  createStudent(student: Student) {
    return this.http.post<Student>(this.BASE_URL + '/api/student', student).subscribe((res) => {
      this.router.navigate(['/student'])
      return res;
    })
  }

  updateStudent(id: string, student: Student) {
    return this.http.put<Student>(this.BASE_URL + '/api/student/' + id, student).subscribe((res) => {
      this.router.navigate(['/student'])
      return res;
    })
  }

  deleteStudent(id: string) {
    return this.http.delete<Student>(this.BASE_URL + '/api/student/' + id).subscribe((res) => {
      this.router.navigate(['/student'])
      return res;
    })
  }
}
