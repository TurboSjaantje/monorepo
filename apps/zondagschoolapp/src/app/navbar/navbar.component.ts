import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'zondagschoolapp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  userIsAdmin: boolean | undefined;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('currentuser')!);
    for (let i of user.roles) {
      if (i == 'admin') this.userIsAdmin = true;
    }
  }

  logOut(): void {
    console.log('test');
    this.loginService.logout();
  }
}
