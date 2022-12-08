import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { verify } from 'jsonwebtoken';
import { identity } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {

    role: string | undefined;

    constructor(role: string) {
        this.role = role;
    }

    canActivate(context: ExecutionContext): boolean {
        const host = context.switchToHttp(),
            request = host.getRequest();

        if (request.headers.authorization) {
            const userRoles = verify(request.headers.authorization.split(" ")[1], 'Secret');

            let userIsAdmin;
            for (let role of userRoles.identity.roles) if (role === this.role || role === 'admin') userIsAdmin = true;

            console.log('user trying to authorize: ', JSON.stringify(userRoles.identity));
            console.log(userIsAdmin)

            return userIsAdmin;
        } else {
            throw new HttpException('User is not logged in', HttpStatus.BAD_REQUEST);
        }
    }

}