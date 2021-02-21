import { NgModule } from '@angular/core'
import { RouterModule, Routes, Router } from '@angular/router'
import { CommonModule } from '@angular/common'
import {LoginComponent} from './login/login.component'
import {SignupComponent} from './signup/signup.component'
import {BrowserModule} from '@angular/platform-browser'
import {FormsModule} from '@angular/forms'
import {LandingComponent} from './landing.component'

const routes: Routes = [{
  path: '',
  component: LandingComponent,
  children: [{
    path: '',
    component: LoginComponent
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
    RouterModule.forChild( routes )
  ]
})
export class LandingModule { }
