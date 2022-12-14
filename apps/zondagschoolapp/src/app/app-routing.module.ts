import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { TeacherComponent } from './teacher/teacher.component';
import { UpdateTeacherComponent } from './teacher/update-teacher/update-teacher.component';
import { HomeComponent } from './home/home.component';
import { ClassComponent } from './class/class.component';
import { SpecialityComponent } from './speciality/speciality.component';
import { AboutComponent } from './about/about.component';
import { ReadTeacherComponent } from './teacher/read-teacher/read-teacher.component';
import { CreateTeacherComponent } from './teacher/create-teacher/create-teacher.component';
import { DeleteTeacherComponent } from './teacher/delete-teacher/delete-teacher.component';
import { StudentComponent } from './student/student.component';
import { UpdateClassComponent } from './class/update-class/update-class.component';
import { ReadClassComponent } from './class/read-class/read-class.component';
import { CreateClassComponent } from './class/create-class/create-class.component';
import { DeleteClassComponent } from './class/delete-class/delete-class.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { UserComponent } from './user/user.component';
import { ReadStudentComponent } from './student/read-student/read-student.component';
import { DeleteStudentComponent } from './student/delete-student/delete-student.component';
import { CreateStudentComponent } from './student/create-student/create-student.component';
import { UpdateStudentComponent } from './student/update-student/update-student.component';

const routes: Route[] = [

  //Default route
  { path: "", component: LoginComponent },

  //Homepages
  { path: "home", component: HomeComponent },
  { path: "teacher", component: TeacherComponent, canActivate: [AuthGuard] },
  { path: "class", component: ClassComponent },
  { path: "speciality", component: SpecialityComponent },
  { path: "about", component: AboutComponent },
  { path: "student", component: StudentComponent },
  { path: "user", component: UserComponent },

  //CRUD Teacher
  { path: "teacher/edit/:id", component: UpdateTeacherComponent },
  { path: "teacher/read/:id", component: ReadTeacherComponent },
  { path: "teacher/create", component: CreateTeacherComponent },
  { path: "teacher/delete/:id", component: DeleteTeacherComponent },

  //CRUD Class
  { path: "class/edit/:id", component: UpdateClassComponent },
  { path: "class/read/:id", component: ReadClassComponent },
  { path: "class/create", component: CreateClassComponent },
  { path: "class/delete/:id", component: DeleteClassComponent },

  //CRUD Student
  { path: "student/read/:id", component: ReadStudentComponent },
  { path: "student/delete/:id", component: DeleteStudentComponent },
  { path: "student/create", component: CreateStudentComponent },
  { path: "student/edit/:id", component: UpdateStudentComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
