import { NgModule } from '@angular/core'
import { RouterModule, Routes, Router } from '@angular/router'
import { CommonModule } from '@angular/common'
import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component'
import { MaterialModule } from '../material.module'
import { FormsModule } from '@angular/forms'
import { LandingComponent } from './landing.component'

const routes: Routes = [{
  path: '',
  component: LandingComponent,
  children: [{
    path: '',
    redirectTo: 'login'
  }, {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'signup',
    component: SignupComponent
  }]
}]

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    LandingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule.forChild( routes )
  ]
})
export class LandingModule { }
