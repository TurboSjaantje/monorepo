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
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
