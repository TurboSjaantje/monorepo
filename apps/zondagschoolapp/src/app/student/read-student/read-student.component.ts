import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClassService } from '../../class/class.service';
import { Subject } from '../../class/subject.model';
import { Student } from '../student.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'zondagschoolapp-read-student',
  templateUrl: './read-student.component.html',
  styleUrls: ['./read-student.component.css'],
})

export class ReadStudentComponent implements OnInit {

  studentId: string | undefined | null;
  student: Student | undefined;
  classes: Subject[] = [];
  subscription: Subscription | undefined;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private studentService: StudentService, private classService: ClassService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.studentId = params.get('id');
      if (this.studentId) {
        this.subscription = this.studentService.getStudentById(this.studentId).subscribe((res) => {
          this.student = res;
          for (let c of this.student.inclass!) {
            this.classService.getClassById(c).subscribe((response) => {
              this.classes!.push(response[0]);
            })
          }
        })
      }
    })
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
