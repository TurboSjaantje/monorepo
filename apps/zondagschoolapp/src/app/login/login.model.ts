export class Credentials {
    emailaddress: string | undefined;
    password: string | undefined;

    constructor(email: string, password: string) {
        this.emailaddress = email;
        this.password = password;
    }
}

export class User {
    emailaddress: string | undefined;
    password: string | undefined;
    token: string | undefined;
    roles: string[] | undefined;

    constructor(email: string, password: string, roles: string[]) {
        this.emailaddress = email;
        this.password = password;
        this.roles = roles;
    }
}