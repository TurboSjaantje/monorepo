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
  NEO_URL = environment.neoUrl;

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
      this.addStudentToNeo(res);
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

  addStudentToNeo(student: Student) {
    let id = student._id;
    console.log(id)
    return this.http.post<any>(this.NEO_URL + '/neo-api/student/' + student._id, student).subscribe((res) => {
      return res;
    })
  }
}
