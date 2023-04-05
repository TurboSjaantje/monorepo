import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { Student } from './student.schema';

//Integratie Tests StudentContoller en SutdentService

describe('StudentController', () => {

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
            const result = [];
            studentService.getAll = jest.fn().mockResolvedValue(result);
            expect(await studentController.getAllStudents()).toBe(result);
        });
    });

    describe('getStudentById', () => {
        it('should return a student', async () => {
            const result = new Student();
            studentService.getOne = jest.fn().mockResolvedValue(result);
            expect(await studentController.getStudentById('1')).toBe(result);
        });
    });

    describe('getStudentsForClass', () => {
        it('should return an array of students', async () => {
            const result = [];
            studentService.getStudentsForClass = jest.fn().mockResolvedValue(result);
            expect(await studentController.getStudentsForClass('1')).toBe(result);
        });
    });

    describe('createStudent', () => {
        it('should return a student', async () => {
            const result = new Student();
            studentService.createOne = jest.fn().mockResolvedValue(result);
            expect(await studentController.createStudent(result)).toBe(result);
        });
    });

    describe('updateStudent', () => {
        it('should return a student', async () => {
            const result = new Student();
            studentService.updateOne = jest.fn().mockResolvedValue(result);
            expect(await studentController.updateStudent('1', result)).toBe(result);
        });
    });

    describe('deleteStudent', () => {
        it('should return a student', async () => {
            const result = new Student();
            studentService.deleteOne = jest.fn().mockResolvedValue(result);
            expect(await studentController.deleteStudent('1')).toBe(result);
        });
    });

});