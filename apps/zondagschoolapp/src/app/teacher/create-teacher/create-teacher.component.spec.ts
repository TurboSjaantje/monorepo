import { ComponentFixture } from "@angular/core/testing";
import { TeacherService } from "../teacher.service";
import { CreateTeacherComponent } from "./create-teacher.component";
import { HttpClient, HttpClientModule, HttpHandler } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { UserService } from "../../user/user.service";
import { of, Subscription } from "rxjs";
import * as exp from "constants";
import { ActivatedRoute, convertToParamMap } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
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
    let component: CreateTeacherComponent;
    let fixture: ComponentFixture<CreateTeacherComponent>;
    let teacherService: TeacherService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            declarations: [
                CreateTeacherComponent,
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

        fixture = TestBed.createComponent(CreateTeacherComponent);
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

    it('should have method create teacher', () => {
        expect(component.createTeacher).toBeTruthy();
    });

    it('should have a form', () => {
        expect(component.teacherForm).toBeTruthy();
    });

});