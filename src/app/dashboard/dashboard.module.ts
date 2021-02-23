import {APP_INITIALIZER, NgModule} from '@angular/core'
import { RouterModule, Routes, Router } from '@angular/router'
import { CommonModule } from '@angular/common'
import { MaterialModule } from '../material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { DashboardComponent } from './dashboard.component'
import { CustomersComponent } from './customers/customers.component'
import { TasksComponent } from './tasks/tasks.component'
import { EditDialogComponent } from './edit-dialog/edit-dialog.component'
import {MatDialog, MatDialogModule} from '@angular/material/dialog'
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { TaskLogDialogComponent } from './task-log-dialog/task-log-dialog.component'
import { AuthService } from '../auth.service'

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
    TasksComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    TaskLogDialogComponent
  ],
  imports: [
    MatDialogModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild( routes )
  ],
  entryComponents: [
      EditDialogComponent
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
    }
  ]
})
export class DashboardModule { }
