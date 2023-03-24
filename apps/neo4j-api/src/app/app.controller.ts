import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
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

  @Get('subject/:subjectId')
  async createSubject(@Param('subjectId') subjectId: string): Promise<any> {
    const res = await this.neo4jService.write(`CREATE (subject:Subject {id: '${subjectId}'})`);
    return res;
  }
}
