import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Schema as MongooseSchema } from 'mongoose';

export type StudentDocument = HydratedDocument<Student>;

@Schema()
export class Student {

    @Prop({ required: true, type: String })
    firstname: string | undefined;

    @Prop({ required: true, type: String })
    lastname: string | undefined;

    @Prop({ required: true, type: Date })
    birthdate: Date | undefined;

    @Prop({ required: true, type: String })
    city: string | undefined;

    @Prop({ required: true, type: String })
    street: string | undefined;

    @Prop({ required: true, type: Number })
    housenumber: number | undefined;

    @Prop({ required: true, type: String })
    postalcode: string | undefined;

    @Prop({ required: false, type: [String] })
    inclass: string[] | undefined;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
