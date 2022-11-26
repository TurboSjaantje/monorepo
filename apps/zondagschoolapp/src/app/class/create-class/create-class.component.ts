import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  selector: 'zondagschoolapp-create-class',
  templateUrl: './create-class.component.html',
  styleUrls: ['./create-class.component.css'],
})

export class CreateClassComponent implements OnInit {

  checkboxesDataList: dataListItem[] = [];

  teachers: Teacher[] | undefined;
  classForm: FormGroup = new FormGroup('');

  selectedItemsList: dataListItem[] = [];
  checkedIDs: any = [];

  constructor(private teacherService: TeacherService, private classService: ClassService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.teachers = this.teacherService.getAllTeachers();
    console.log(this.teachers.length + " teachers found.");

    for (let t of this.teachers) {
      if (t.emailAddress && t.firstName && t.lastName) {
        this.checkboxesDataList.push(new dataListItem(t.emailAddress, t.firstName + ' ' + t.lastName, false))
      }
    }

    this.classForm = this.fb.group({
      name: ['', Validators.required],
      age: [0, Validators.required],
      time: ['', Validators.required],
    })

    this.fetchSelectedItems();
    this.fetchCheckedIDs();
  }

  createClass() {
    console.log('test');

    let name = this.classForm.value.name;
    let age = this.classForm.value.age;
    let time = this.classForm.value.time;
    let teachers = this.teacherService.getMultipleTeachersById(this.selectedItemsList);

    if (name && age && time && teachers) {
      this.classService.createClass(new Class(name, age, time, teachers));
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

  fetchCheckedIDs() {
    this.checkedIDs = []
    this.checkboxesDataList.forEach((value, index) => {
      if (value.isChecked) {
        this.checkedIDs.push(value.id);
      }
    });
  }

}
