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

        });

        it('should login', async () => {
            const login = await request(server)
                .post('/data-api/login')
                .send(credentials);
        });

    });
});
