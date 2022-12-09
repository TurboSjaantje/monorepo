import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  selector: 'zondagschoolapp-create-class',
  templateUrl: './create-class.component.html',
  styleUrls: ['./create-class.component.css'],
})

export class CreateClassComponent implements OnInit {
  subscription: Subscription | undefined;
  checkboxesDataList: dataListItem[] = [];

  teachers: Teacher[] | undefined;
  classForm: FormGroup = new FormGroup('');

  selectedItemsList: dataListItem[] = [];
  checkedIDs: any = [];

  constructor(private teacherService: TeacherService, private classService: ClassService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.subscription = this.teacherService.getAllTeachers().subscribe((response) => {
      this.teachers = response;

      console.log(this.teachers);

      for (let t of this.teachers) {
        if (t.emailaddress && t.firstname && t.lastname) {
          this.checkboxesDataList.push(new dataListItem(t.emailaddress, t.firstname + ' ' + t.lastname, false))
        }
      }

      this.classForm = this.fb.group({
        name: ['', Validators.required],
        age: [0, Validators.required],
        time: ['', Validators.required],
      })

      this.fetchSelectedItems();
      this.fetchCheckedIDs();
    })
  }

  addClass() {
    console.log('addClass called');

    let selectedTeachers: string[] = [];
    for (let i of this.selectedItemsList) selectedTeachers.push(i.id!);

    let subscription = this.teacherService.getMultipleTeachersById(selectedTeachers).subscribe((response) => {
      this.classService.createClass(new Subject(this.classForm.value.name, this.classForm.value.age, this.classForm.value.time, response), selectedTeachers);

      subscription.unsubscribe();
    })

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

  ngOnDestroy(): void {
    if (this.subscription) {
      console.log("unsubscribing");
      this.subscription.unsubscribe();
    }
  }

}
