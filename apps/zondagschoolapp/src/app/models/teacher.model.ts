export class Teacher {
    id: string | undefined;
    username: string | undefined;
    email: string | undefined;

    constructor(username: string, email: string) {
        this.email = email;
        this.username = username;
    }
}