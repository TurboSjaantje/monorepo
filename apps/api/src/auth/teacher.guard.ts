import { Injectable } from "@nestjs/common";
import { AuthGuard } from "./auth.guard";

@Injectable()
export class TeacherGuard extends AuthGuard {

    constructor() {
        super('teacher');
    }

}