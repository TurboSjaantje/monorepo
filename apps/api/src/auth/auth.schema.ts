import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Schema as MongooseSchema } from 'mongoose';

export type CredentialsDocument = HydratedDocument<Credentials>;

@Schema()
export class Credentials {

    @Prop()
    emailaddress: string;

    @Prop()
    password: string;

}

export const CredentialsSchema = SchemaFactory.createForClass(Credentials);

