import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'zondagschoolapp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private loginService: LoginService) { }

  ngOnInit(): void { }

  logOut(): void {
    console.log('test');
    this.loginService.logout();
  }
}
