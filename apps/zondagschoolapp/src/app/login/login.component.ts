import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Credentials } from './login.model';
import { LoginService } from './login.service';
import { Token } from './token.decorator';

@Component({
  selector: 'zondagschoolapp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {

  errormessage: string | undefined;

  loginreturn: Token | Error | undefined;

  userForm = this.fb.group({
    emailaddress: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private loginService: LoginService, private fb: FormBuilder) { }

  ngOnInit(): void { }

  loginUser() {
    if (this.userForm.value.emailaddress && this.userForm.value.password) {

      console.log(this.userForm.value.emailaddress, this.userForm.value.password);

      let credentials = new Credentials(this.userForm.value.emailaddress, this.userForm.value.password);


      this.loginService.login(credentials).subscribe((res) => {
        this.loginreturn = res;
        this.errormessage = (this.loginreturn as Error).message;
      });


    } else {
      console.log('Log in not succesfull');
    }
  }

}
