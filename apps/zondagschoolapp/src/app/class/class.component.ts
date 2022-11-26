import { Component, OnInit } from '@angular/core';
import { Class } from './class.model';
import { ClassService } from './class.service';

@Component({
  selector: 'zondagschoolapp-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css'],
})

export class ClassComponent implements OnInit {
  classes: Class[] | undefined;

  constructor(private classService: ClassService) { }

  ngOnInit(): void {
    this.classes = this.classService.getAllClasses();
    console.log("Found " + this.classes.length + " classes!");
  }
}
