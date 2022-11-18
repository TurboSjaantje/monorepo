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

const routes: Route[] = [

  //Homepages
  { path: "home", component: HomeComponent },
  { path: "teacher", component: TeacherComponent },
  { path: "class", component: ClassComponent },
  { path: "speciality", component: SpecialityComponent },
  { path: "about", component: AboutComponent },

  //Edit Teacher
  { path: "teacher/edit/:id", component: UpdateTeacherComponent },

  //Read Teacher
  { path: "teacher/read/:id", component: ReadTeacherComponent },

  //Create Teacher
  { path: "teacher/create", component: CreateTeacherComponent },

  //Delete Teacher
  { path: "teacher/delete/:id", component: DeleteTeacherComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
