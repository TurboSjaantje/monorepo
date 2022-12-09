import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student, StudentDocument } from './student.schema';

@Injectable()
export class StudentService {
    constructor(@InjectModel(Student.name) private studentModel: Model<StudentDocument>) { }

    async ensureExists(student: Student) {
        try {
            return await this.studentModel.create(student);
        } catch (error) { }
    }

    async getAll() {
        return await this.studentModel.find(
            { $sort: { firstname: 1 } }
        )
    }

    async getOne(id: string) {
        return await this.studentModel.findById(id);
    }

    async getStudentsForClass(id: string) {
        return await this.studentModel.aggregate([
            { $match: { inclass: id } },
            { $sort: { firstname: 1 } }
        ]);
    }

    async createOne(student: Student) {
        return await this.ensureExists(student);
    }

    async updateOne(id: string, student: Student) {
        return await this.studentModel.findByIdAndUpdate(id, student, { returnOriginal: true });
    }

    async deleteOne(id: string) {
        return await this.studentModel.findByIdAndDelete(id, { returnOriginal: true });
    }
}
