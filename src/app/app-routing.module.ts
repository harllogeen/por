import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RestaurantComponent } from './developers/developers.component';
import { StudentListComponent } from './student-dashboard/student-list/student-list.component';
import { MaterialComponent } from './material/material.component';
import { AuthGuard } from './share/auth.guard';

const routes: Routes = [
  {path: '', redirectTo:'login', pathMatch:'full'},
  {path:'login', component: LoginComponent},
  {path:'signup', component: SignUpComponent},
  {path:'restaurant', component: RestaurantComponent, canActivate:[AuthGuard]},
  {path: 'studentlist', component: StudentListComponent},
  {path:'material', component: MaterialComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
