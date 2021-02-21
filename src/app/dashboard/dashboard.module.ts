import { NgModule } from '@angular/core'
import { RouterModule, Routes, Router } from '@angular/router'
import { CommonModule } from '@angular/common'
import { MaterialModule } from '../material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { DashboardComponent } from './dashboard.component'
import { CustomersComponent } from './customers/customers.component'
import { TasksComponent } from './tasks/tasks.component'

const routes: Routes = [{
  path: '',
  component: DashboardComponent,
  children: [{
    path: '',
    redirectTo: 'tasks'
  }, {
    path: 'tasks',
    component: TasksComponent
  }, {
    path: 'customers',
    component: CustomersComponent
  }]
}]

@NgModule({
  declarations: [
    DashboardComponent,
    CustomersComponent,
    TasksComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild( routes )
  ]
})
export class DashboardModule { }
