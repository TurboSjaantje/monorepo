import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { Teacher } from './teacher.schema';
import mongoose, { ObjectId } from 'mongoose';
import { listenerCount } from 'events';
import { AdminGuard } from '../auth/admin.guard';
import { TeacherGuard } from '../auth/teacher.guard';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) { }

  @Get()
  @UseGuards(AdminGuard)
  async getAll(): Promise<Teacher[]> {
    return this.teacherService.getAll();
  }

  @Get(':emailaddress')
  @UseGuards(AdminGuard)
  async getById(@Param('emailaddress') emailaddress: string): Promise<Teacher> {
    return await this.teacherService.getById(emailaddress);
  }

  @Post()
  @UseGuards(AdminGuard)
  async addTeacher(@Body() teacher: Teacher) {
    return this.teacherService.addTeacher(teacher);
  }

  @Post('/multiple')
  @UseGuards(TeacherGuard)
  async getMultipleTeachers(@Body() teachers: string[]) {
    console.log(teachers);
    return this.teacherService.getMultipleTeachers(teachers);
  }

  @Put(':emailaddress')
  @UseGuards(AdminGuard)
  async updateTeacher(@Param('emailaddress') emailaddress: string, @Body() teacher: Teacher): Promise<Teacher> {
    return this.teacherService.updateTeacher(emailaddress, teacher);
  }

  @Delete(':emailaddress')
  @UseGuards(AdminGuard)
  async deleteTeacher(@Param('emailaddress') emailaddress: string): Promise<Teacher> {
    return this.teacherService.deleteTeacher(emailaddress);
  }
}
