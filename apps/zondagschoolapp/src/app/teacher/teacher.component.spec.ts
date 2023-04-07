import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeacherComponent } from './teacher.component';
import { TeacherService } from './teacher.service';
import { of } from 'rxjs';
import { Teacher } from './teacher.model';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

describe('TeacherComponent', () => {
    let component: TeacherComponent;
    let fixture: ComponentFixture<TeacherComponent>;
    let teacherService: TeacherService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TeacherComponent],
            providers: [TeacherService, HttpClient, HttpClientModule, HttpHandler],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TeacherComponent);
        component = fixture.componentInstance;
        teacherService = TestBed.inject(TeacherService);
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    describe('ngOnInit', () => {
        it('should retrieve teachers from the teacher service', () => {
            const mockTeachers: Teacher[] = [
                {
                    emailaddress: 'john.doe@mail.com',
                    firstname: 'John',
                    lastname: 'Doe',
                    birthdate: new Date('1990-01-01'),
                    city: 'New York',
                    street: 'Main Street',
                    housenumber: 1,
                    postalcode: '10001',
                },
                {
                    emailaddress: 'jane.doe@mail.com',
                    firstname: 'Jane',
                    lastname: 'Doe',
                    birthdate: new Date('1992-01-01'),
                    city: 'New York',
                    street: 'Broadway',
                    housenumber: 2,
                    postalcode: '10002',
                }
            ];

            jest.spyOn(teacherService, 'getAllTeachers').mockReturnValue(of(mockTeachers));

            component.ngOnInit();

            let result: Teacher[] = [];
            let subscription = component.teachers$?.subscribe(res => {
                result = res;
                subscription!.unsubscribe();
            });

            console.log(result)

            expect(result).toEqual(mockTeachers);
        });
    });

    describe('ngOnDestroy', () => {
        it('should unsubscribe from the subscription', () => {
            component.subscription = { unsubscribe: jest.fn() } as any;

            component.ngOnDestroy();

            expect(component.subscription!.unsubscribe).toHaveBeenCalled();
        });
    });
});
