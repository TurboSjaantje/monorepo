import { Inject, Injectable } from '@nestjs/common';

import mongoose, { Model, Schema } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Teacher, TeacherDocument } from './teacher.schema';
import { UserController } from '../user/user.controller';
import { User, UserDocument } from '../user/user.schema';

@Injectable()
export class TeacherService {
  constructor(
    @InjectModel(Teacher.name) private teacherModel: Model<TeacherDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) { }

  async ensureExists(teacher: Teacher) {
    try {
      return await this.teacherModel.create(teacher);
    } catch (error) { }
  }

  async getAll() {
    return await this.teacherModel.find(
      { $sort: { firstname: 1 } }
    );
  }

  async getById(emailaddress: string) {
    const filter = { emailaddress: emailaddress }
    return this.teacherModel.findOne(filter);
  }

  async addTeacher(teacher: Teacher) {
    return await this.ensureExists(teacher);
  }

  async getMultipleTeachers(teachers: string[]) {
    return await this.teacherModel.find({ emailaddress: { $in: teachers } });
  }

  async updateTeacher(emailaddress: string, teacher: Teacher) {
    const filter = { emailaddress: emailaddress };
    let oldTeacher = await this.teacherModel.findOneAndUpdate(filter, teacher, { returnOriginal: true });
    await this.userModel.findOneAndUpdate({ emailaddress: oldTeacher.emailaddress }, { $set: { emailaddress: teacher.emailaddress } });
    console.log(oldTeacher.emailaddress);
    return oldTeacher;
  }

  async deleteTeacher(emailaddress: string) {
    const filter = { emailaddress: emailaddress };
    let deletedTeacher = await this.teacherModel.findOneAndDelete(filter);
    if (this.userModel.findOne(filter) != null) {
      await this.userModel.findOneAndDelete(filter);
    }
    return deletedTeacher;
  }
}
