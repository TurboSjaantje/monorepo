import { Inject, Injectable } from '@nestjs/common';

import mongoose, { Model, Schema } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Teacher, TeacherDocument } from './teacher.schema';

@Injectable()
export class TeacherService {
  constructor(
    @InjectModel(Teacher.name) private teacherModel: Model<TeacherDocument>
  ) { }

  async ensureExists(teacher: Teacher) {
    try {
      await this.teacherModel.create(teacher);
    } catch (error) { }
  }

  async getAll() {
    return this.teacherModel.find();
  }

  async getById(emailaddress: string) {
    const filter = { emailaddress: emailaddress }
    return this.teacherModel.findOne(filter);
  }

  async addTeacher(teacher: Teacher) {
    await this.ensureExists(teacher);
  }

  async updateTeacher(emailaddress: string, teacher: Teacher) {
    const filter = { emailaddress: emailaddress };
    let oldTeacher = await this.teacherModel.findOneAndUpdate(filter, teacher, { returnOriginal: true });
    console.log(oldTeacher.firstname);
    return oldTeacher;
  }

  async deleteTeacher(emailaddress: string) {
    const filter = { emailaddress: emailaddress };
    let deletedTeacher = await this.teacherModel.findOneAndDelete(filter);
    return deletedTeacher;
  }
}
