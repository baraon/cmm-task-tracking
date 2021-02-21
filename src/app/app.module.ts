import { NgModule } from '@angular/core'
import { RouterModule, Routes, Router } from '@angular/router'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from './material.module'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

import { AppComponent } from './app.component'
import { DashboardComponent } from './dashboard/dashboard.component'


const appRoutes: Routes = [
  {
    path: '',
    loadChildren: './landing/landing.module#LandingModule'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  { // Redirect from anywhere not explicitly listed above to the dashboard
    path: '**',
    redirectTo: ''
  }
]

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    RouterModule.forRoot( appRoutes, {
      enableTracing: false,
      scrollPositionRestoration: 'enabled'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
