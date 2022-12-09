import { Inject, Injectable } from '@nestjs/common';

import mongoose, { Model, Schema } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { UserController } from '../user/user.controller';
import { User, UserDocument } from '../user/user.schema';
import { Subject, SubjectDocument } from './class.schema';

@Injectable()
export class ClassService {

    constructor(
        @InjectModel(Subject.name) private classModel: Model<SubjectDocument>
    ) { }

    async ensureExists(subject: Subject) {
        try {
            return await this.classModel.create(subject);
        } catch (error) { }
    }

    async getAll() {
        return await this.classModel.aggregate([
            { $lookup: { from: 'teachers', localField: 'teachers', foreignField: 'emailaddress', as: 'teacherObjects' } },
            {
                $group: {
                    _id: "$_id",
                    name: { $first: '$name' },
                    age: { $first: '$age' },
                    time: { $first: '$time' },
                    teachers: { $push: "$teacherObjects" }
                }
            },
            { $sort: { name: 1 } }
        ]);
    }

    async getOne(id: string) {
        return await this.classModel.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(id) } },
            { $lookup: { from: 'teachers', localField: 'teachers', foreignField: 'emailaddress', as: 'teacherObjects' } },
            {
                $group: {
                    _id: "$_id",
                    name: { $first: '$name' },
                    age: { $first: '$age' },
                    time: { $first: '$time' },
                    teachers: { $first: "$teacherObjects" }
                }
            }
        ]);
    }

    async createClass(subject: Subject) {
        console.log(subject)
        return await this.ensureExists(subject);
    }

    async updateClass(id: string, subject: Subject) {
        console.log(id)
        let oldSubject = await this.classModel.findByIdAndUpdate(id, subject, { returnOriginal: true });
        return oldSubject;
    }

    async deleteClass(id: string) {
        let oldSubject = await this.classModel.findByIdAndDelete(id, { returnOriginal: true });
        return oldSubject;
    }

}


