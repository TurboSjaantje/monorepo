import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { allowedNodeEnvironmentFlags } from "process";
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
                    let admin = false;
                    for (let role of token.roles) {
                        if (role == 'admin') admin = true;
                    }
                    console.log(admin);
                    return admin;
                } else {
                    console.log('not logged in, reroute to /');
                    this.router.navigate(['/']);
                    return false;
                }

            }),
        )
    }

}