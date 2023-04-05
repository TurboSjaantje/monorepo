import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Schema as MongooseSchema } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

    @Prop({ required: true, type: String })
    emailaddress: string;

    @Prop({ required: true, type: String })
    password: string;

    @Prop({ required: true, type: [String] })
    roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
