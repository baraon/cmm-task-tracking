import { NgModule, APP_INITIALIZER, } from '@angular/core'
import { RouterModule, Routes, Router } from '@angular/router'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from './material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AuthService } from './auth.service'

import { AppComponent } from './app.component'


const appRoutes: Routes = [
  {
    path: '',
    loadChildren: './landing/landing.module#LandingModule'
  },
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  { // Redirect from anywhere not explicitly listed above to the dashboard
    path: '**',
    redirectTo: ''
  }
]

@NgModule({
  declarations: [
    AppComponent,
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
  providers: [
    { // initialize app service globally
      provide: APP_INITIALIZER,
      // tslint:disable-next-line:typedef
      useFactory(as: AuthService) {
        return () => as.init()
      },
      multi: true,
      deps: [ AuthService ],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
