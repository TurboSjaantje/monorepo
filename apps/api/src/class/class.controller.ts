import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { TeacherGuard } from '../auth/teacher.guard';
import { TeacherService } from '../teacher/teacher.service';
import { Subject } from './class.schema';
import { ClassService } from './class.service';

@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService, private readonly teacherService: TeacherService) { }

  @Get()
  @UseGuards(TeacherGuard)
  async getAll(): Promise<Subject[]> {
    return await this.classService.getAll();
  }

  @Get(':id')
  @UseGuards(TeacherGuard)
  async getOne(@Param('id') id: string) {
    return await this.classService.getOne(id);
  }

  @Post()
  @UseGuards(TeacherGuard)
  async addClass(@Body() subject: Subject) {
    console.log('create class called')
    return this.classService.createClass(subject);
  }

  @Put(':id')
  @UseGuards(TeacherGuard)
  async updateClass(@Param('id') id: string, @Body() subject: Subject) {
    return this.classService.updateClass(id, subject);
  }

  @Delete(':id')
  @UseGuards(TeacherGuard)
  async deleteClass(@Param('id') id: string) {
    return this.classService.deleteClass(id);
  }

}
