import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../login/login.model';
import { Token } from '../login/token.decorator';
import { Teacher } from '../teacher/teacher.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  BASE_URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addUser(email: string, password: string, isadmin: boolean) {
    let user;
    if (isadmin) {
      user = {
        emailaddress: email,
        password: password,
        roles: [
          "admin",
          "teacher"
        ]
      }
    } else {
      user = {
        emailaddress: email,
        password: password,
        roles: [
          "teacher"
        ]
      }
    }

    return this.http.post(this.BASE_URL + '/api/user', user).subscribe();
  }

  getUserById(email: string): Observable<User> {
    const userUrl = this.BASE_URL + "/api/user/" + email;
    console.log("GET: " + userUrl);

    return this.http.get<User>(userUrl).pipe(
      map((response: User) => response),
      tap((user: User) => {
        return user;
      })
    );
  }

}
