import { Teacher } from "../teacher/teacher.model";

export class Subject {
    _id: string | undefined;
    name: string | undefined;
    age: number | undefined;
    time: string | undefined;
    teachers: Teacher[] | undefined;

    constructor(name: string, age: number, time: string, teachers: Teacher[]) {
        this.name = name;
        this.age = age;
        this.time = time;
        this.teachers = teachers;
    }
}