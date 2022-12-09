import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subscription, tap } from 'rxjs';
import { Class } from '../class.model';
import { ClassService } from '../class.service';
import { Subject } from '../subject.model';

@Component({
  selector: 'zondagschoolapp-read-class',
  templateUrl: './read-class.component.html',
  styleUrls: ['./read-class.component.css'],
})

export class ReadClassComponent implements OnInit {

  classId: string | null | undefined;
  class: Subject | undefined;
  subscription: Subscription | undefined;

  constructor(private classService: ClassService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.classId = params.get("id");
      if (this.classId) {
        console.log("class exists with id: " + this.classId);
        this.subscription = this.classService.getClassById(this.classId).subscribe((response) => {
          this.class = response[0];
          console.log(JSON.stringify(this.class))
        });
      } else {
        console.log("class does not exist with id: " + this.classId);
      }
    })
  }
}
