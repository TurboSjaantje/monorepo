import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Console } from 'console';
import { Teacher } from '../../teacher/teacher.model';
import { TeacherService } from '../../teacher/teacher.service';
import { Class } from '../class.model';
import { ClassService } from '../class.service';

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
  checkboxesDataList: dataListItem[] = [];

  teachers: Teacher[] | undefined;
  classForm: FormGroup = new FormGroup('');

  selectedItemsList: dataListItem[] = [];
  checkedIDs: any = [];

  classId: string | null | undefined;
  class: Class | undefined;

  constructor(private teacherService: TeacherService, private classService: ClassService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) { }

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

    this.teachers = this.teacherService.getAllTeachers();
    console.log(this.teachers.length + " teachers found.");

    for (let t of this.teachers) {
      if (t.emailAddress && t.firstName && t.lastName) {
        this.checkboxesDataList.push(new dataListItem(t.emailAddress, t.firstName + ' ' + t.lastName, false))
      }
    }

    this.classForm = this.fb.group({
      name: [this.class?.name, Validators.required],
      age: [this.class?.age, Validators.required],
      time: [this.class?.time, Validators.required],
    })

    this.fetchSelectedItems();
    this.fetchCheckedIDs();

    if (this.class?.teachers) {
      this.setSelectedItems(this.class?.teachers);
    }
  }

  updateClass() {
    for (let item of this.selectedItemsList) console.log(item.teacher + ' = ' + item.isChecked)

    let name = this.classForm.value.name;
    let age = this.classForm.value.age;
    let time = this.classForm.value.time;
    let teachers = this.teacherService.getMultipleTeachersById(this.selectedItemsList);

    for (let teacher of teachers) console.log(teacher.firstName + ' ' + teacher.lastName);

    if (name && age && time && teachers && this.class) {
      this.classService.updateClass(this.class, new Class(name, age, time, teachers));
    }

    this.classForm.reset();
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
        if (item.id == teacher.emailAddress) item.isChecked = true;
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

}
