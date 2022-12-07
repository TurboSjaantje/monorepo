import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Credentials, User } from './login.model';
import { Token } from './token.decorator';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public currentUser$ = new BehaviorSubject<Token | undefined>(undefined);
  private readonly CURRENT_USER = 'currentuser';
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  BASE_URL = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) { }

  private saveUserToLocalStorage(token: Token) {
    localStorage.setItem(this.CURRENT_USER, JSON.stringify(token));
  }

  login(formData: Credentials): Observable<Token | undefined> {
    return this.http.post<Token>("/api/login", formData, { headers: this.headers })
      .pipe(
        map((data: any) => data),
        map((token: Token) => {
          console.log(JSON.stringify(token));
          this.saveUserToLocalStorage(token);
          this.currentUser$.next(token);
          this.router.navigate(['/home']);
          return token;
        }),
        catchError((error) => {
          console.log('error:', error);
          console.log('error.message:', error.message);
          console.log('error.error.message:', error.error.message);
          return of(undefined);
        })
      );
  }

  logout(): void {
    console.log('logging out');
    this.router
      .navigate(['/'])
      .then((success) => {
        if (success) {
          console.log('logout - removing local user info');
          localStorage.removeItem(this.CURRENT_USER);
          this.currentUser$.next(undefined);
          console.log('Logged Out succesfully')
        } else {
          console.log('naviaget reulst:', success);
        }
      })
      .catch((error) => console.log('not logged out'));
  }

}
