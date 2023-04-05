import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { Model } from "mongoose";
import { StudentController } from "./student.controller";
import { StudentDocument } from "./student.schema";
import { Student } from "../../../zondagschoolapp/src/app/student/student.model";
import { StudentService } from "./student.service";

//Unit test StudentService

describe('StudentService', () => {

    let studentController: StudentController;
    let studentService: StudentService;

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            controllers: [StudentController],
            providers: [
                StudentService, { provide: getModelToken(Student.name), useValue: jest.fn() }
            ],
        }).compile();

        studentController = moduleRef.get<StudentController>(StudentController);
        studentService = moduleRef.get<StudentService>(StudentService);
    });

    describe('root', () => {
        it('should be defined', () => {
            expect(studentController).toBeDefined();
        });
    });

    describe('getAllStudents', () => {
        it('should return an array of students', async () => {
            const result = [1, 2, 3];
            studentService.getAll = jest.fn().mockImplementation(() => Promise.resolve(result));
            expect(await studentService.getAll()).toBe(result);
        });
    });

    describe('getStudentById', () => {
        it('should return a student', async () => {
            const result = new Student("John", "Doe", new Date(), "1", "1", 1, "1111XX", ["1", "2"]);
            studentService.getOne = jest.fn().mockImplementation(() => Promise.resolve(result));
            expect(await studentService.getOne(result._id)).toBe(result);
        });
    });

    describe('getStudentsForClass', () => {
        it('should return an array of students', async () => {
            const result = [1, 2, 3];
            studentService.getStudentsForClass = jest.fn().mockImplementation(() => Promise.resolve(result));
            expect(await studentService.getStudentsForClass('1')).toBe(result);
        });
    });

    describe('createStudent', () => {
        it('should return a student', async () => {
            const result = new Student("John", "Doe", new Date(), "1", "1", 1, "1111XX", ["1", "2"]);
            studentService.createOne = jest.fn().mockImplementation(() => Promise.resolve(result));
            expect(await studentService.createOne(result)).toBe(result);
        });
    });

    describe('updateStudent', () => {
        it('should return a student', async () => {
            const result = new Student("John", "Doe", new Date(), "1", "1", 1, "1111XX", ["1", "2"]);
            studentService.updateOne = jest.fn().mockImplementation(() => Promise.resolve(result));
            expect(await studentService.updateOne(result._id, result)).toBe(result);
        });
    });

    describe('deleteStudent', () => {
        it('should return a student', async () => {
            const result = new Student("John", "Doe", new Date(), "1", "1", 1, "1111XX", ["1", "2"]);
            studentService.deleteOne = jest.fn().mockImplementation(() => Promise.resolve(result));
            expect(await studentService.deleteOne(result._id)).toBe(result);
        });
    });

});