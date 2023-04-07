import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Teacher, TeacherService } from '../teacher.service';
import { UpdateTeacherComponent } from './update-teacher.component';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { BehaviorSubject, of, Subscription } from 'rxjs';
import { Directive, HostListener, Input } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Directive({
    selector: '[routerLink]'
})
export class RouterLinkDirectiveStub {
    @Input('routerLink') linkParams: any;
    navigatedTo: any = null;

    @HostListener('click')
    onClick() {
        this.navigatedTo = this.linkParams;
    }
}

const mockTeacher = {
    emailaddress: 'john.doe@mail.com',
    firstname: 'John',
    lastname: 'Doe',
    birthdate: new Date('1990-01-01'),
    city: 'New York',
    street: 'Main Street',
    housenumber: 1,
    postalcode: '10001',
};

describe('UpdateTeacherComponent', () => {
    let component: UpdateTeacherComponent;
    let fixture: ComponentFixture<UpdateTeacherComponent>;

    let teacherService: TeacherService;
    let mockTeacher$ = BehaviorSubject<Teacher>;
    let routerSopy: any;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            declarations: [
                UpdateTeacherComponent,
                RouterLinkDirectiveStub
            ],
            providers: [
                TeacherService,
                HttpClient,
                HttpClientModule,
                HttpHandler,
                FormBuilder,
                {
                    provide: ActivatedRoute, useValue: {
                        paramMap: of(convertToParamMap({
                            id: 'john.doe@mail.com'
                        })
                        ),
                    },
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(UpdateTeacherComponent);
        component = fixture.componentInstance;
        teacherService = TestBed.inject(TeacherService);
        fixture.detectChanges();
    });

    afterEach(() => {
        fixture.destroy();
    });

    it('should create the component', (done) => {
        component.subscription = new Subscription();

        jest.spyOn(teacherService, 'getTeacherById').mockReturnValue(of(mockTeacher));

        fixture.detectChanges();
        component.ngOnInit();

        expect(component).toBeTruthy();
        expect(component.teacherEmailAddress).toEqual(mockTeacher.emailaddress);
        expect(component.teacher).toEqual(mockTeacher);
        done();
    });

    it('should update the teacher', (done) => {
        component.subscription = new Subscription();

        jest.spyOn(teacherService, 'getTeacherById').mockReturnValue(of(mockTeacher));
        jest.spyOn(teacherService, 'updateTeacher').mockReturnValue();

        fixture.detectChanges();
        component.ngOnInit();

        expect(component).toBeTruthy();
        expect(component.teacherEmailAddress).toEqual(mockTeacher.emailaddress);
        expect(component.teacher).toEqual(mockTeacher);

        component.updateTeacher();

        expect(component.teacher).toEqual(mockTeacher);
        expect(component.teacherEmailAddress).toEqual(mockTeacher.emailaddress);
        done(); 
    });

});