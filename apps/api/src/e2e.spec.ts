import { HttpServer, INestApplication, MiddlewareConsumer, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient } from "mongodb";

import { AppModule } from "./app/app.module";
import { RouterModule } from "@nestjs/core";
import { Test, TestingModule } from "@nestjs/testing";
import { Credentials } from "./auth/auth.schema";
import request = require('supertest');

let mongod: MongoMemoryServer;
let uri: string;

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: async () => {
                mongod = await MongoMemoryServer.create();
                uri = mongod.getUri();
                return { uri };
            },
        }),
        AppModule,
        RouterModule.register([{
            path: 'data-api',
            module: AppModule,
        }]),
    ],
    controllers: [],
    providers: []
})

export class ApiModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply().forRoutes('data-api');
    }
}

describe('end-to-end tests for data api', () => {
    let app: INestApplication;
    let server;
    let module: TestingModule;
    let mongoc: MongoClient;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            imports: [ApiModule],
        }).compile();

        app = module.createNestApplication();
        await app.init();

        mongoc = new MongoClient(uri);
        await mongoc.connect();

        server = app.getHttpServer();
    });

    beforeEach(async () => {
        await mongoc.db('Zondagschoolapp').collection('users').deleteMany({});
        await mongoc.db('Zondagschoolapp').collection('teachers').deleteMany({});
        await mongoc.db('Zondagschoolapp').collection('credentials').deleteMany({});
        await mongoc.db('Zondagschoolapp').collection('subjects').deleteMany({});
        await mongoc.db('Zondagschoolapp').collection('students').deleteMany({});
    });

    afterAll(async () => {
        await mongoc.close();
        await mongod.stop();
        await app.close();
    });

    describe('single user', () => {
        let credentials: Credentials;

        beforeEach(async () => {
            credentials = {
                emailaddress: 'daanvdm@hotmail.com',
                password: 'daanvdm',
            };

            const user = {
                emailaddress: credentials.emailaddress,
                password: credentials.password,
                roles: ['admin', 'teacher']
            };

            await request(server)
                .post('/data-api/user')
                .send(user)
        });

        it('a user logs in and there are no students', async () => {
            const login = await request(server)
                .post('/data-api/login')
                .send(credentials);

            expect(login.status).toBe(201);
            expect(login.body).toHaveProperty('token');

            const token = login.body.token;

            const students = await request(server)
                .get('/data-api/student')
                .set('Authorization', `Bearer ${token}`);

            expect(students.status).toBe(200);
            expect(students.body).toHaveLength(0);
        });

        it('a user tries to log in with wrong password', async () => {
            const login = await request(server)
                .post('/data-api/login')
                .send({ ...credentials, password: 'wrong' });

            expect(login.status).toBe(401);
            expect(login.body).toHaveProperty('message', 'Ongeldig emailadres of wachtwoord');
        });

        it('a user logs in and tries creates a student, but it fails, then retrieves no students', async () => {
            const student = {
                lastname: 'van der Meulen',
                birthdate: new Date('2005-01-01'),
                city: 'Amsterdam',
                street: 'Kerkstraat',
                housenumber: 1,
                postalcode: '1234AB',
                inclass: ['1A']
            }

            const login = await request(server)
                .post('/data-api/login')
                .send(credentials);

            expect(login.status).toBe(201);
            expect(login.body).toHaveProperty('token');

            const token = login.body.token;

            const createStudents = await request(server)
                .post('/data-api/student')
                .set('Authorization', `Bearer ${token}`)
                .send(student);

            expect(createStudents.status).toBe(201);
            expect(createStudents.body).toHaveProperty('message', 'Student validation failed: firstname: Path `firstname` is required.');

            const getStudents = await request(server)
                .get('/data-api/student')
                .set('Authorization', `Bearer ${token}`);

            expect(getStudents.status).toBe(200);
            expect(getStudents.body).toHaveLength(0);
        });

        it('a user logs in and creates a student, then retrieves the students', async () => {
            const student = {
                firstname: 'Daan',
                lastname: 'van der Meulen',
                birthdate: new Date('2005-01-01'),
                city: 'Amsterdam',
                street: 'Kerkstraat',
                housenumber: 1,
                postalcode: '1234AB',
                inclass: ['1A']
            }

            const login = await request(server)
                .post('/data-api/login')
                .send(credentials);

            expect(login.status).toBe(201);
            expect(login.body).toHaveProperty('token');

            const token = login.body.token;

            const createStudents = await request(server)
                .post('/data-api/student')
                .set('Authorization', `Bearer ${token}`)
                .send(student);

            expect(createStudents.status).toBe(201);
            expect(createStudents.body).toHaveProperty('firstname', 'Daan');

            const getStudents = await request(server)
                .get('/data-api/student')
                .set('Authorization', `Bearer ${token}`);

            expect(getStudents.status).toBe(200);
            expect(getStudents.body).toHaveLength(1);
        });

    });

});
