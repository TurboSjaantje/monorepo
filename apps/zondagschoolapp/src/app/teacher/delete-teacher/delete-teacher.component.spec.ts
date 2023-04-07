import { ComponentFixture } from "@angular/core/testing";
import { TeacherService } from "../teacher.service";
import { DeleteTeacherComponent } from "./delete-teacher.component";
import { HttpClient, HttpClientModule, HttpHandler } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { UserService } from "../../user/user.service";
import { of, Subscription } from "rxjs";
import * as exp from "constants";
import { ActivatedRoute, convertToParamMap } from "@angular/router";
import { FormBuilder } from "@angular/forms";
import { Directive, HostListener, Input } from "@angular/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";

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

describe('ReadTeacherComponent', () => {
    let component: DeleteTeacherComponent;
    let fixture: ComponentFixture<DeleteTeacherComponent>;
    let teacherService: TeacherService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            declarations: [
                DeleteTeacherComponent,
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

        fixture = TestBed.createComponent(DeleteTeacherComponent);
        component = fixture.componentInstance;
        teacherService = TestBed.inject(TeacherService);
        fixture.detectChanges();
    });

    afterEach(() => {
        fixture.destroy();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });


    it('should retrieve the teacherid from the context', () => {
        component.subscription = new Subscription();

        jest.spyOn(teacherService, 'getTeacherById').mockReturnValue(of(mockTeacher));

        fixture.detectChanges();
        component.ngOnInit();

        expect(component.teacherId).toEqual('john.doe@mail.com');
    });


    it('should retrieve the teacher from the service', () => {
        component.subscription = new Subscription();

        jest.spyOn(teacherService, 'getTeacherById').mockReturnValue(of(mockTeacher));

        fixture.detectChanges();
        component.ngOnInit();

        expect(component.teacher).toEqual(mockTeacher);
    });

});