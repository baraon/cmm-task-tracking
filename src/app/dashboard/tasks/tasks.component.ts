import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { MatDialog } from '@angular/material/dialog'
import {TaskLogDialogComponent} from '../task-log-dialog/task-log-dialog.component'

@Component({
  selector: 'cmm-task-tracking-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks = []

  constructor( public http: HttpClient, public dialog: MatDialog ) { }
  displayedColumns: string[] = [ 'actions', 'duration', 'user' ]

  ngOnInit(): void {
    this.http.get( '/api/taskLogs' ).toPromise().then( (data: any) => {
      console.log( data.tasks )
      this.tasks = data.tasks
    })
  }

  openTaskLogDialog( taskId, log = null,  operation ): void {
    const dialogRef = this.dialog.open( TaskLogDialogComponent, {
      width: '400px',
      data: { log, taskId, operation }
    })

    dialogRef.afterClosed().subscribe( result => {
      if ( !result )
        return

      if ( result.add ) {
        const taskIndex = this.tasks.findIndex( task => task.id === taskId )
        if ( taskIndex === -1 )
          return

        this.tasks[ taskIndex ].taskLogs.push( result.add.task )
      }
      else if ( result.edit ) {
        const taskIndex = this.tasks.findIndex( task => +task.id === taskId )
        if ( taskIndex === -1 )
          return

        const taskLogIndex = this.tasks[ taskIndex ].taskLogs.findIndex( l => l.id === result.edit.task.id )
        if ( taskLogIndex === -1 )
          return

        console.log( result.edit, this.tasks[ taskIndex ].taskLogs[ taskLogIndex ] )
        this.tasks[ taskIndex ].taskLogs[ taskLogIndex ] = result.edit.task
      }
      else if ( result.delete ) {
        console.log( 'delete some stuff' )
        // delete only returns id of deleted row
        const taskIndex = this.tasks.findIndex( task => task.id === taskId )
        if ( taskIndex === -1 )
          return

        const taskLogIndex = this.tasks[ taskIndex ].taskLogs.findIndex( l => l.id === +result.delete.id )
        console.log( taskLogIndex )
        if ( taskLogIndex === -1 )
          return

        this.tasks[ taskIndex ].taskLogs.splice( taskLogIndex, 1 )
      }
    })
  }
}
