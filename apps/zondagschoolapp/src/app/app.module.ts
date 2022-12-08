import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TeacherComponent } from './teacher/teacher.component';
import { CreateTeacherComponent } from './teacher/create-teacher/create-teacher.component';
import { ReadTeacherComponent } from './teacher/read-teacher/read-teacher.component';
import { UpdateTeacherComponent } from './teacher/update-teacher/update-teacher.component';
import { DeleteTeacherComponent } from './teacher/delete-teacher/delete-teacher.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { SpecialityComponent } from './speciality/speciality.component';
import { AboutComponent } from './about/about.component';
import { ClassComponent } from './class/class.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentComponent } from './student/student.component';
import { CreateClassComponent } from './class/create-class/create-class.component';
import { ReadClassComponent } from './class/read-class/read-class.component';
import { UpdateClassComponent } from './class/update-class/update-class.component';
import { DeleteClassComponent } from './class/delete-class/delete-class.component';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';
import { UserComponent } from './user/user.component';
import { AuthInterceptor, httpInterceptorProviders } from './login/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    TeacherComponent,
    CreateTeacherComponent,
    ReadTeacherComponent,
    UpdateTeacherComponent,
    DeleteTeacherComponent,
    FooterComponent,
    HomeComponent,
    SpecialityComponent,
    AboutComponent,
    ClassComponent,
    StudentComponent,
    CreateClassComponent,
    ReadClassComponent,
    UpdateClassComponent,
    DeleteClassComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [AuthGuard, httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule { }
