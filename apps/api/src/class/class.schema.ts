import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Schema as MongooseSchema } from 'mongoose';

export type SubjectDocument = HydratedDocument<Subject>;

@Schema()
export class Subject {

    @Prop()
    name: string | undefined;

    @Prop()
    age: number | undefined;

    @Prop()
    time: string | undefined;

    @Prop()
    teachers: string[] | undefined;

    constructor(name: string, age: number, time: string, teachers: string[]) {
        this.name = name;
        this.age = age;
        this.time = time;
        this.teachers = teachers;
    }

}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
