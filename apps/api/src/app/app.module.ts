import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TeacherController } from '../teacher/teacher.controller';
import { TeacherService } from '../teacher/teacher.service';
import { Teacher, TeacherSchema } from '../teacher/teacher.schema';

import { UserController } from '../user/user.controller';
import { UserService } from '../user/user.service';
import { User, UserSchema } from '../user/user.schema';

import { AuthController } from '../auth/auth.controller';
import { AuthService } from '../auth/auth.service';
import { Credentials, CredentialsSchema } from '../auth/auth.schema';

import { ClassService } from '../class/class.service';
import { ClassController } from '../class/class.controller';
import { Subject, SubjectSchema } from '../class/class.schema';

import { Student, StudentSchema } from '../student/student.schema';
import { StudentService } from '../student/student.service';
import { StudentController } from '../student/student.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://nestjs-admin:dm0YV19DeWntl9y2@cluster0.ik0qlq0.mongodb.net/Zondagschoolapp?retryWrites=true&w=majority'),
    MongooseModule.forFeature([
      { name: Teacher.name, schema: TeacherSchema },
      { name: User.name, schema: UserSchema },
      { name: Credentials.name, schema: CredentialsSchema },
      { name: Subject.name, schema: SubjectSchema },
      { name: Student.name, schema: StudentSchema }]),

  ],
  controllers: [AppController, TeacherController, UserController, AuthController, ClassController, StudentController],
  providers: [AppService, TeacherService, UserService, AuthService, ClassService, StudentService],
})

export class AppModule { }
