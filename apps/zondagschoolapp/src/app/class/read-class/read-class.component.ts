import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Class } from '../class.model';
import { ClassService } from '../class.service';

@Component({
  selector: 'zondagschoolapp-read-class',
  templateUrl: './read-class.component.html',
  styleUrls: ['./read-class.component.css'],
})

export class ReadClassComponent implements OnInit {

  classId: string | null | undefined;
  class: Class | undefined;

  constructor(private classService: ClassService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.classId = params.get("id");
      if (this.classId) {
        console.log("class exists with id: " + this.classId);
        this.class = this.classService.getClassById(this.classId);
      } else {
        console.log("class does not exist with id: " + this.classId);
      }
    })
  }
}
