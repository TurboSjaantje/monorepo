import { Test, TestingModule } from '@nestjs/testing';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { Teacher } from './teacher.schema';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../user/user.schema';

describe('TeacherService', () => {

    let teacherController: TeacherController;
    let teacherService: TeacherService;

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            controllers: [TeacherController],
            providers: [
                TeacherService,
                { provide: getModelToken(Teacher.name), useValue: jest.fn() },
                { provide: getModelToken(User.name), useValue: jest.fn() }
            ],
        }).compile();

        teacherController = moduleRef.get<TeacherController>(TeacherController);
        teacherService = moduleRef.get<TeacherService>(TeacherService);
    });

    describe('root', () => {
        it('should be defined', () => {
            expect(teacherController).toBeDefined();
        });
    });

    describe('getAllTeachers', () => {
        it('should return an array of teachers', async () => {
            const result = [];
            teacherService.getAll = jest.fn().mockResolvedValue(result);
            expect(await teacherController.getAll()).toBe(result);
        });
    });

    describe('getTeacherById', () => {
        it('should return a teacher', async () => {
            const result = new Teacher();
            teacherService.getById = jest.fn().mockResolvedValue(result);
            expect(await teacherController.getById('1')).toBe(result);
        });
    });

    describe('getMultipleTeachers', () => {
        it('should return an array of teachers', async () => {
            const result = [];
            teacherService.getMultipleTeachers = jest.fn().mockResolvedValue(result);
            expect(await teacherController.getMultipleTeachers([])).toBe(result);
        });
    });

    describe('updateTeacher', () => {
        it('should return a teacher', async () => {
            const result = new Teacher();
            teacherService.updateTeacher = jest.fn().mockResolvedValue(result);
            expect(await teacherController.updateTeacher('1', result)).toBe(result);
        });
    });

    describe('deleteTeacher', () => {
        it('should return a teacher', async () => {
            const result = new Teacher();
            teacherService.deleteTeacher = jest.fn().mockResolvedValue(result);
            expect(await teacherController.deleteTeacher('1')).toBe(result);
        });
    });

});