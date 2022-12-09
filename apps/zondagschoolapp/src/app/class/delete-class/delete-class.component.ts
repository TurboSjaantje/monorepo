import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Class } from '../class.model';
import { ClassService } from '../class.service';
import { Subject } from '../subject.model';

@Component({
  selector: 'zondagschoolapp-delete-class',
  templateUrl: './delete-class.component.html',
  styleUrls: ['./delete-class.component.css'],
})

export class DeleteClassComponent implements OnInit {

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
        })
      } else {
        console.log("class does not exist with id: " + this.classId);
      }
    })
  }

  deleteClass() {
    if (this.class) {
      this.classService.deleteClass(this.class);
    }
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
