import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { map, Observable } from "rxjs";
import { LoginService } from "./login/login.service";
import { Token } from "./login/token.decorator";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private loginService: LoginService, private router: Router) { }

    canActivate(): Observable<boolean> {
        console.log('canActivate LoggedIn');
        return this.loginService.currentUser$.pipe(
            map((token: Token | undefined) => {
                if (token && token.token) {
                    if (token.roles.includes('admin')) return true;
                    else return false;
                } else {
                    console.log('not logged in, reroute to /');
                    this.router.navigate(['/']);
                    return false;
                }

            }),
        )
    }

}