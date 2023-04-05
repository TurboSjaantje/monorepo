import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Schema as MongooseSchema } from 'mongoose';

export type TeacherDocument = HydratedDocument<Teacher>;

@Schema()
export class Teacher {

    @Prop({ required: true, type: String, unique: true })
    emailaddress: string | undefined;

    @Prop({ required: true, type: String })
    firstname: string | undefined;

    @Prop({ required: true, type: String })
    lastname: string | undefined;

    @Prop({ required: true, type: String })
    birthdate: Date | undefined;

    @Prop({ required: true, type: String })
    city: string | undefined;

    @Prop({ required: true, type: String })
    street: string | undefined;

    @Prop({ required: true, type: Number })
    housenumber: number | undefined;

    @Prop({ required: true, type: String })
    postalcode: string | undefined;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
