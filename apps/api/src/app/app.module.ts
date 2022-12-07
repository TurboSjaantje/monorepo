import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { TeacherController } from '../teacher/teacher.controller';

import { AppService } from './app.service';
import { TeacherService } from '../teacher/teacher.service';
import { Teacher, TeacherSchema } from '../teacher/teacher.schema';

import { UserController } from '../user/user.controller';
import { UserService } from '../user/user.service';
import { User, UserSchema } from '../user/user.schema';
import { AuthController } from '../auth/auth.controller';
import { AuthService } from '../auth/auth.service';
import { Credentials, CredentialsSchema } from '../auth/auth.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://nestjs-admin:dm0YV19DeWntl9y2@cluster0.ik0qlq0.mongodb.net/Zondagschoolapp?retryWrites=true&w=majority'),
    MongooseModule.forFeature([
      { name: Teacher.name, schema: TeacherSchema },
      { name: User.name, schema: UserSchema },
      { name: Credentials.name, schema: CredentialsSchema }]),

  ],
  controllers: [AppController, TeacherController, UserController, AuthController],
  providers: [AppService, TeacherService, UserService, AuthService],
})

export class AppModule { }
