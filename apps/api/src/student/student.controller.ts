import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { TeacherGuard } from '../auth/teacher.guard';
import { Student } from './student.schema';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) { }

  @Get()
  @UseGuards(TeacherGuard)
  getAllStudents() {
    return this.studentService.getAll();
  }

  @Get(':id')
  @UseGuards(TeacherGuard)
  getStudentById(@Param('id') id: string) {
    return this.studentService.getOne(id);
  }

  @Get('/class/:id')
  @UseGuards(TeacherGuard)
  async getStudentsForClass(@Param('id') id: string) {
    return await this.studentService.getStudentsForClass(id);
  }

  @Post()
  @UseGuards(TeacherGuard)
  createStudent(@Body() student: Student) {
    return this.studentService.createOne(student);
  }

  @Put(':id')
  @UseGuards(TeacherGuard)
  updateStudent(@Param('id') id: string, @Body() student: Student) {
    return this.studentService.updateOne(id, student);
  }

  @Delete(':id')
  @UseGuards(TeacherGuard)
  deleteStudent(@Param('id') id: string) {
    return this.studentService.deleteOne(id);
  }
}
