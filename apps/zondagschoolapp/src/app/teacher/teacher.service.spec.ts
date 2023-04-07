import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TeacherService } from './teacher.service';
import { Teacher } from './teacher.model';

describe('TeacherService', () => {
    let service: TeacherService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [TeacherService]
        });
        service = TestBed.inject(TeacherService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get all teachers', () => {
        const mockTeachers: Teacher[] = [
            new Teacher(
                'teacher1@example.com',
                'John',
                'Doe',
                new Date(1990, 1, 1),
                'City',
                'Street',
                1,
                '12345'
            ),
            new Teacher(
                'teacher2@example.com',
                'Jane',
                'Doe',
                new Date(1991, 2, 2),
                'City',
                'Street',
                2,
                '12345'
            ),
        ];

        service.getAllTeachers().subscribe((teachers: Teacher[]) => {
            expect(teachers.length).toBe(2);
            expect(teachers).toEqual(mockTeachers);
        });

        const req = httpMock.expectOne(`${service.BASE_URL}/api/teacher`);
        expect(req.request.method).toBe('GET');
        req.flush(mockTeachers);
    });

    it('should get teacher by id', () => {
        const mockTeacher: Teacher = new Teacher(
            'teacher1@example.com',
            'John',
            'Doe',
            new Date(1990, 1, 1),
            'City',
            'Street',
            1,
            '12345'
        );
        const emailaddress = 'john.smith@example.com';

        service.getTeacherById(emailaddress).subscribe((teacher: Teacher) => {
            expect(teacher).toEqual(mockTeacher);
        });

        const req = httpMock.expectOne(`${service.BASE_URL}/api/teacher/${emailaddress}`);
        expect(req.request.method).toBe('GET');
        req.flush(mockTeacher);
    });

    it('should create a new teacher', () => {
        const mockTeacher: Teacher = new Teacher(
            'teacher1@example.com',
            'John',
            'Doe',
            new Date(1990, 1, 1),
            'City',
            'Street',
            1,
            '12345'
        );

        service.createTeacher(mockTeacher);

        const req = httpMock.expectOne(`${service.BASE_URL}/api/teacher`);
        expect(req.request.method).toBe('POST');
        req.flush(mockTeacher);
    });

    it('should update an existing teacher', () => {
        const oldTeacher: Teacher = new Teacher(
            'teacher1@example.com',
            'John',
            'Doe',
            new Date(1990, 1, 1),
            'City',
            'Street',
            1,
            '12345'
        );
        const newTeacher: Teacher = new Teacher(
            'teacher1@example.com',
            'Johnnnnn',
            'Doe',
            new Date(1990, 1, 1),
            'City',
            'Street',
            1,
            '12345'
        );

        service.updateTeacher(oldTeacher, newTeacher);

        const req = httpMock.expectOne(`${service.BASE_URL}/api/teacher/${oldTeacher.emailaddress}`);
        expect(req.request.method).toBe('PUT');
        req.flush(newTeacher);
    });

    it('should delete an existing teacher', () => {
        const mockTeacher: Teacher = new Teacher(
            'teacher1@example.com',
            'John',
            'Doe',
            new Date(1990, 1, 1),
            'City',
            'Street',
            1,
            '12345'
        );

        service.deleteTeacher(mockTeacher);

        const req = httpMock.expectOne(`${service.BASE_URL}/api/teacher/${mockTeacher.emailaddress}`);
        expect(req.request.method).toBe('DELETE');
        req.flush(mockTeacher);
    });
});

