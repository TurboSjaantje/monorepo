import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Schema as MongooseSchema } from 'mongoose';

export type TeacherDocument = HydratedDocument<Teacher>;

@Schema()
export class Teacher {

    @Prop()
    emailaddress: string | undefined;

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
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
