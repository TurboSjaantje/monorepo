import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j';

@Injectable()
export class AppService {

  constructor(private readonly neo4jService: Neo4jService) { }

  getData(): { message: string } {
    return { message: 'Welcome to neo4j-api!' };
  }

  async createStudentWithRelationships(studentId: string, student: any): Promise<any> {
    const res = await this.neo4jService.write(`CREATE (student:Student {id: '${studentId}', name: '${student.firstname} ${student.lastname}'})`);

    let subjects = student.inclass;
    for (let s of subjects) {
      await this.neo4jService.write(`MATCH (student:Student {id: '${studentId}'}) MATCH (subject:Subject {id: '${s}'}) CREATE (student)-[:IN_CLASS]->(subject)`); 
    }
    
    return res;
  }

  async updateStudentWithRelationships(studentId: string, student: any): Promise<any> {
    const res = await this.neo4jService.write(`MATCH (student:Student {id: '${studentId}'}) SET student.name = '${student.firstname} ${student.lastname}'`);

    //Delete all relationships
    await this.neo4jService.write(`MATCH (student:Student {id: '${studentId}'})-[r:IN_CLASS]->() DELETE r`);

    let subjects = student.inclass;
    for (let s of subjects) {
      await this.neo4jService.write(`MATCH (student:Student {id: '${studentId}'}) MATCH (subject:Subject {id: '${s}'}) MERGE (student)-[:IN_CLASS]->(subject)`); 
    }
    
    return res;
  }

  async getRecommendationForStudent(studentId: string): Promise<any> {
    const res = await this.neo4jService.read(`MATCH (student:Student {id: '${studentId}'})-[:IN_CLASS]-(subject:Subject)<-[:IN_CLASS]-(other:Student)
    MATCH (other)-[:IN_CLASS]->(rec:Subject)
    WHERE NOT (student)-[:IN_CLASS]->(rec)
    RETURN DISTINCT rec.id`);
    return res.records.map(record => record.get('rec.id'))
  }
}
