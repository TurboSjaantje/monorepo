import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Schema as MongooseSchema } from 'mongoose';

export type StudentDocument = HydratedDocument<Student>;

@Schema()
export class Student {

    @Prop()
    firstname: string | undefined;

    @Prop()
    lastname: string | undefined;

    @Prop()
    birthdate: Date | undefined;

    @Prop()
    city: string | undefined;

    @Prop()
    street: string | undefined;

    @Prop()
    housenumber: number | undefined;

    @Prop()
    postalcode: string | undefined;

    @Prop()
    inclass: string[] | undefined;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
