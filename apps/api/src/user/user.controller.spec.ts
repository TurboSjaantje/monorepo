import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.schema';
import { getModelToken } from '@nestjs/mongoose';

describe('User Controller', () => {

    let userController: UserController;
    let userService: UserService;

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                UserService,
                { provide: getModelToken(User.name), useValue: jest.fn() }
            ],
        }).compile();

        userController = moduleRef.get<UserController>(UserController);
        userService = moduleRef.get<UserService>(UserService);
    });

    describe('root', () => {
        it('should be defined', () => {
            expect(userController).toBeDefined();
        });
    });

    describe('findAll', () => {
        it('should return an array of users', async () => {
            const result = ['test'];
            jest.spyOn(userService, 'getAllUsers').mockImplementation(() => Promise.resolve(result) as any);

            expect(await userController.getAllUsers()).toBe(result);
        });
    });

    describe('findOne', () => {
        it('should return a user', async () => {
            const result = 'test';
            jest.spyOn(userService, 'getById').mockImplementation(() => Promise.resolve(result) as any);

            expect(await userController.getUserById('test')).toBe(result);
        });
    });

    describe('create', () => {
        it('should return a user', async () => {
            const result = 'test';
            jest.spyOn(userService, 'addUser').mockImplementation(() => Promise.resolve(result) as any);

            expect(await userController.create({} as User)).toBe(result);
        });
    });

    describe('update', () => {
        it('should return a user', async () => {
            const result = 'test';
            jest.spyOn(userService, 'updateUser').mockImplementation(() => Promise.resolve(result) as any);

            expect(await userController.updateUser('test', {} as User)).toBe(result);
        });
    });

    describe('remove', () => {
        it('should return a user', async () => {
            const result = 'test';
            jest.spyOn(userService, 'deleteUser').mockImplementation(() => Promise.resolve(result) as any);

            expect(await userController.deleteUser('test')).toBe(result);
        });
    });

});