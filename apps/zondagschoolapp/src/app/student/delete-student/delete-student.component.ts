import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClassService } from '../../class/class.service';
import { Subject } from '../../class/subject.model';
import { Student } from '../student.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'zondagschoolapp-delete-student',
  templateUrl: './delete-student.component.html',
  styleUrls: ['./delete-student.component.css'],
})
export class DeleteStudentComponent implements OnInit {

  studentId: string | undefined | null;
  student: Student | undefined;
  class: Subject | undefined;
  subscription: Subscription | undefined;

  constructor(private activatedRoute: ActivatedRoute, private studentService: StudentService, private classService: ClassService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.studentId = params.get('id');
      if (this.studentId) {
        this.subscription = this.studentService.getStudentById(this.studentId).subscribe((res) => {
          this.student = res;
          this.classService.getClassById(this.student.inclass!).subscribe((response) => {
            this.class = response[0];
          })
          this.subscription!.unsubscribe()
        })
      }
    })
  }

  deleteStudent() {
    this.studentService.deleteStudent(this.studentId!);
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
