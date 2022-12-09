import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Student } from './student.model';
import { StudentService } from './student.service';

@Component({
  selector: 'zondagschoolapp-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {

  students: Student[] | undefined;
  subscription: Subscription | undefined;

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.subscription = this.studentService.getAllStudent().subscribe((res) => {
      this.students = res;
    })
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
