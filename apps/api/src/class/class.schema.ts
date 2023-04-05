import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Schema as MongooseSchema } from 'mongoose';

export type SubjectDocument = HydratedDocument<Subject>;

@Schema()
export class Subject {

    @Prop({ required: true, type: String })
    name: string | undefined;

    @Prop({ required: true, type: Number })
    age: number | undefined;

    @Prop({ required: false, type: String })
    time: string | undefined;

    @Prop({ required: false, type: [String] })
    teachers: string[] | undefined;

    constructor(name: string, age: number, time: string, teachers: string[]) {
        this.name = name;
        this.age = age;
        this.time = time;
        this.teachers = teachers;
    }

}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
