import { Test, TestingModule } from '@nestjs/testing';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';
import { Subject } from './class.schema';
import { getModelToken } from '@nestjs/mongoose';

describe('Class Service', () => {

    let classService: ClassService;
    let classController: ClassController;

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            controllers: [ClassController],
            providers: [
                ClassService,
                { provide: getModelToken(Subject.name), useValue: jest.fn() }
            ],
        }).compile();

        classService = moduleRef.get<ClassService>(ClassService);
        classController = moduleRef.get<ClassController>(ClassController);
    });

    describe('root', () => {
        it('should be defined', () => {
            expect(classService).toBeDefined();
        });
    });

    describe('findAll', () => {
        it('should return an array of subjects', async () => {
            const result = ['test'];
            jest.spyOn(classService, 'getAll').mockImplementation(() => Promise.resolve(result) as any);

            expect(await classService.getAll()).toBe(result);
        });
    });

    describe('findOne', () => {
        it('should return a subject', async () => {
            const result = 'test';
            jest.spyOn(classService, 'getOne').mockImplementation(() => Promise.resolve(result) as any);

            expect(await classService.getOne('test')).toBe(result);
        });
    }); 

    describe('create', () => {
        it('should return a subject', async () => {
            const result = 'test';
            jest.spyOn(classService, 'createClass').mockImplementation(() => Promise.resolve(result) as any);

            expect(await classService.createClass({} as Subject)).toBe(result);
        });
    });

    describe('update', () => {
        it('should return a subject', async () => {
            const result = 'test';
            jest.spyOn(classService, 'updateClass').mockImplementation(() => Promise.resolve(result) as any);

            expect(await classService.updateClass('test', {} as Subject)).toBe(result);
        });
    });

    describe('remove', () => {
        it('should return a subject', async () => {
            const result = 'test';
            jest.spyOn(classService, 'deleteClass').mockImplementation(() => Promise.resolve(result) as any);

            expect(await classService.deleteClass('test')).toBe(result);
        });
    });

});