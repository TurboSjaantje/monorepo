import { Component, OnInit } from '@angular/core';
import { Subscribable, Subscription } from 'rxjs';
import { Teacher } from '../teacher/teacher.model';
import { Class } from './class.model';
import { ClassService } from './class.service';
import { Subject } from './subject.model';

@Component({
  selector: 'zondagschoolapp-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css'],
})

export class ClassComponent implements OnInit {
  classes: Subject[] | undefined;
  subscription: Subscription | undefined;

  constructor(private classService: ClassService) { }

  ngOnInit(): void {
    this.subscription = this.classService.getAllClasses().subscribe((response) => {
      this.classes = response;
      console.log(JSON.stringify(this.classes))
      console.log("Found " + this.classes.length + " classes!");
    })
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
