import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Student, StudentDocument, StudentSchema } from './student.schema';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';

describe('Student', () => {
    let mongod: MongoMemoryServer;
    let studentModel: Model<StudentDocument>;

    beforeAll(async () => {
        const app = await Test.createTestingModule({
            imports: [
                MongooseModule.forRootAsync({
                    useFactory: async () => {
                        mongod = await MongoMemoryServer.create();
                        const uri = mongod.getUri();
                        return { uri };
                    },
                }),
                MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }])
            ],
        }).compile();

        studentModel = app.get<Model<StudentDocument>>(getModelToken(Student.name));
        await studentModel.ensureIndexes();
    });

    afterAll(async () => {
        await mongod.stop();
    });

    it('should be defined', () => {
        expect(studentModel).toBeDefined();
    });

    it('Firstname should be required', () => {
        const model = new studentModel();
        model.firstname = undefined;
        expect(model.validateSync().errors.firstname).toBeDefined();
    });

    it('Firstname should be correct', async () => {
        const model = new studentModel({ firstname: 'John', lastname: 'Doe', birthdate: new Date(), city: '1', street: '1', housenumber: 1, postalcode: '1111XX', classIds: ['1', '2'] });
        await model.save();

        const result = (await studentModel.findOne({ firstname: 'John' })).firstname;
        await expect(result).toEqual(model.firstname);
    });

    it('Last name should be required', () => {
        const model = new studentModel();
        model.lastname = undefined;
        expect(model.validateSync().errors.lastname).toBeDefined();
    });

    it('Last name should be correct', async () => {
        const model = new studentModel({ lastname: 'Doe', firstname: 'John', birthdate: new Date(), city: '1', street: '1', housenumber: 1, postalcode: '1111XX', classIds: ['1', '2'] });
        await model.save();

        const result = (await studentModel.findOne({ lastname: 'Doe' })).lastname;
        await expect(result).toEqual(model.lastname);
    });

    it('Birthdate should be required', () => {
        const model = new studentModel();
        model.birthdate = undefined;
        expect(model.validateSync().errors.birthdate).toBeDefined();
    });

    it('City should be required', () => {
        const model = new studentModel();
        model.city = undefined;
        expect(model.validateSync().errors.city).toBeDefined();
    });

    it('City should be correct', async () => {
        const model = new studentModel({ city: '1', firstname: 'John', lastname: 'Doe', birthdate: new Date(), street: '1', housenumber: 1, postalcode: '1111XX', classIds: ['1', '2'] });
        await model.save();

        const result = (await studentModel.findOne({ city: '1' })).city;
        await expect(result).toEqual(model.city);
    });

    it('Street should be required', () => {
        const model = new studentModel();
        model.street = undefined;
        expect(model.validateSync().errors.street).toBeDefined();
    });

    it('Street should be correct', async () => {
        const model = new studentModel({ street: '1', firstname: 'John', lastname: 'Doe', birthdate: new Date(), city: '1', housenumber: 1, postalcode: '1111XX', classIds: ['1', '2'] });
        await model.save();

        const result = (await studentModel.findOne({ street: '1' })).street;
        await expect(result).toEqual(model.street);
    });

    it('Housenumber should be required', () => {
        const model = new studentModel();
        model.housenumber = undefined;
        expect(model.validateSync().errors.housenumber).toBeDefined();
    });

    it('Housenumber should be correct', async () => {
        const model = new studentModel({ housenumber: 1, firstname: 'John', lastname: 'Doe', birthdate: new Date(), city: '1', street: '1', postalcode: '1111XX', classIds: ['1', '2'] });
        await model.save();

        const result = (await studentModel.findOne({ housenumber: 1 })).housenumber;
        await expect(result).toEqual(model.housenumber);
    });

    it('Housenumber should be a number', () => {
        const model = new studentModel();
        model.housenumber = 1;
        expect(model.validateSync().errors.housenumber).toBeUndefined();
    });

    it('Postalcode should be required', () => {
        const model = new studentModel();
        model.postalcode = undefined;
        expect(model.validateSync().errors.postalcode).toBeDefined();
    });

    it('Postalcode should be correct', async () => {
        const model = new studentModel({ postalcode: '1', firstname: 'John', lastname: 'Doe', birthdate: new Date(), city: '1', street: '1', housenumber: 1, classIds: ['1', '2'] });
        await model.save();

        const result = (await studentModel.findOne({ postalcode: '1' })).postalcode;
        await expect(result).toEqual(model.postalcode);
    });

});