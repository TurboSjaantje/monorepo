import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'zondagschoolapp-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {

  userIsAdmin: boolean | undefined;

  constructor() { }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('currentuser')!);
    for (let i of user.roles) {
      if (i == 'admin') this.userIsAdmin = true;
    }
  }
}
