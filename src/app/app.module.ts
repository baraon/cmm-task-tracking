import { NgModule } from '@angular/core'
import { RouterModule, Routes, Router } from '@angular/router'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'

const appRoutes: Routes = [
  {
    path: '',
    component: AppComponent
  }
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot( appRoutes, {
      enableTracing: false,
      scrollPositionRestoration: 'enabled'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
