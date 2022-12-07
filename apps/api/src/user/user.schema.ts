import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Schema as MongooseSchema } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

    @Prop()
    emailaddress: string;

    @Prop()
    password: string;

    @Prop()
    roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
