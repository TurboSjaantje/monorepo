import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Teacher } from './teacher.schema';
import mongoose, { ObjectId } from 'mongoose';
import { listenerCount } from 'events';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) { }

  @Get()
  async getAll(): Promise<Teacher[]> {
    return this.teacherService.getAll();
  }

  @Get(':emailaddress')
  async getById(@Param('emailaddress') emailaddress: string): Promise<Teacher> {
    return this.teacherService.getById(emailaddress);
  }

  @Post()
  async addTeacher(@Body() teacher: Teacher) {
    await this.teacherService.addTeacher(teacher);
  }

  @Put(':emailaddress')
  async updateTeacher(@Param('emailaddress') emailaddress: string, @Body() teacher: Teacher): Promise<Teacher> {
    return this.teacherService.updateTeacher(emailaddress, teacher);
  }

  @Delete(':emailaddress')
  async deleteTeacher(@Param('emailaddress') emailaddress: string): Promise<Teacher> {
    return this.teacherService.deleteTeacher(emailaddress);
  }
}
