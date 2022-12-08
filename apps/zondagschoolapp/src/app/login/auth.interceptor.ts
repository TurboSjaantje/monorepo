import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { LoginService } from './login.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private auth: LoginService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.auth.getAuthorizationToken();

        const authReq = req.clone({
            setHeaders: { Authorization: 'Bearer ' + authToken }
        })

        return next.handle(authReq)
    }
}

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
]