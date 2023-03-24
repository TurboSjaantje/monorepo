import { Body, Controller, Get, Delete, Param, Put, Post, Query } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly neo4jService: Neo4jService) { }

  @Get()
  async getHello(): Promise<any> {
    const res = await this.neo4jService.read(`MATCH (n) RETURN count(n) as count`);

    return `There are ${res.records[0].get('count')} nodes in the database`;
  }

  @Post('subject/:subjectId')
  async createSubject(@Param('subjectId') subjectId: string, @Body() subject: any): Promise<any> {
    const res = await this.neo4jService.write(`CREATE (subject:Subject {id: '${subjectId}', name: '${subject.name}'})`);
    return res;
  }

  @Delete('subject/:subjectId')
  async deleteSubject(@Param('subjectId') subjectId: string): Promise<any> {
    const res = await this.neo4jService.write(`MATCH (subject:Subject {id: '${subjectId}'}) DETACH DELETE subject`);
    return res;
  }

  @Post('student/:studentId')
  async createStudent(@Param('studentId') studentId: string, @Body() student: any): Promise<any> {
    console.log(JSON.stringify(student));
    console.log(studentId)
    this.appService.createStudentWithRelationships(studentId, student);
  }

  @Put('student/:studentId')
  async updateStudent(@Param('studentId') studentId: string, @Body() student: any): Promise<any> {
    this.appService.updateStudentWithRelationships(studentId, student);
  }

  @Put('subject/:subjectId')
  async updateSubject(@Param('subjectId') subjectId: string, @Body() subject: any): Promise<any> {
    const res = await this.neo4jService.write(`MATCH (s:Subject {id: '${subjectId}'}) SET s.name = '${subject.name}'`);
    return res;
  }
}
