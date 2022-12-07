import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'zondagschoolapp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userIsAdmin: boolean | undefined;

  constructor() { }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('currentuser')!);
    for (let i of user.roles) {
      if (i == 'admin') this.userIsAdmin = true;
    }
  }
}
