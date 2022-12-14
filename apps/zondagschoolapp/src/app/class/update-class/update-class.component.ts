import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Console } from 'console';
import { Subscription } from 'rxjs';
import { Teacher } from '../../teacher/teacher.model';
import { TeacherService } from '../../teacher/teacher.service';
import { Class } from '../class.model';
import { ClassService } from '../class.service';
import { Subject } from '../subject.model';

export class dataListItem {
  id: string | undefined;
  teacher: string | undefined;
  isChecked: boolean | undefined;

  constructor(id: string, teacher: string, isChecked: boolean) {
    this.id = id;
    this.teacher = teacher;
    this.isChecked = isChecked;
  }
}

@Component({
  selector: 'zondagschoolapp-update-class',
  templateUrl: './update-class.component.html',
  styleUrls: ['./update-class.component.css'],
})

export class UpdateClassComponent implements OnInit {
  subscription: Subscription | undefined;
  subscription2: Subscription | undefined;
  checkboxesDataList: dataListItem[] = [];

  teachers: Teacher[] | undefined;
  classForm: FormGroup = new FormGroup('');

  selectedItemsList: dataListItem[] = [];
  checkedIDs: any = [];

  classId: string | null | undefined;
  class: Subject | undefined;

  constructor(private teacherService: TeacherService, private classService: ClassService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {
      this.classId = params.get("id");
      if (this.classId) {
        console.log("class exists with id: " + this.classId);
        this.subscription2 = this.classService.getClassById(this.classId).subscribe((response) => {
          this.class = response[0];
          this.classForm = this.fb.group({
            name: [this.class?.name, Validators.required],
            age: [this.class?.age, Validators.required],
            time: [this.class?.time, Validators.required],
          })
          this.subscription = this.teacherService.getAllTeachers().subscribe((response) => {
            this.teachers = response;

            if (this.teachers)
              for (let t of this.teachers) {
                if (t.emailaddress && t.firstname && t.lastname) {
                  this.checkboxesDataList.push(new dataListItem(t.emailaddress, t.firstname + ' ' + t.lastname, false))
                }
              }
            this.setSelectedItems(this.class!.teachers!);
            this.fetchSelectedItems();
            this.fetchCheckedIDs();
          })
        })
      } else {
        console.log("class does not exist with id: " + this.classId);
      }
    })
  }

  updateClass() {
    for (let item of this.selectedItemsList) console.log(item.teacher + ' = ' + item.isChecked)

    let name = this.classForm.value.name;
    let age = this.classForm.value.age;
    let time = this.classForm.value.time;
    let teachers;

    let selectedTeachers: string[] = [];
    for (let i of this.selectedItemsList) {
      selectedTeachers.push(i.id!);
    }

    let subscription = this.teacherService.getMultipleTeachersById(selectedTeachers).subscribe((response) => {
      teachers = response;
      for (let teacher of teachers) console.log(teacher.firstname + ' ' + teacher.lastname);
      this.classService.updateClass(this.class!, new Subject(name, age, time, teachers), selectedTeachers);
      this.classForm.reset();
      subscription.unsubscribe();
    });
  }

  changeSelection() {
    this.fetchSelectedItems()
  }

  fetchSelectedItems() {
    this.selectedItemsList = this.checkboxesDataList.filter((value, index) => {
      return value.isChecked
    });
  }

  setSelectedItems(teachers: Teacher[]) {
    for (let teacher of teachers) {
      for (let item of this.checkboxesDataList) {
        if (item.id == teacher.emailaddress) item.isChecked = true;
      }
    }
  }

  fetchCheckedIDs() {
    this.checkedIDs = []
    this.checkboxesDataList.forEach((value, index) => {
      if (value.isChecked) {
        this.checkedIDs.push(value.id);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      console.log("unsubscribing");
      this.subscription.unsubscribe();
    }
    if (this.subscription2) this.subscription2.unsubscribe();
  }

}
