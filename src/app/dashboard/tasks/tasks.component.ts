import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { MatDialog } from '@angular/material/dialog'
import {TaskLogDialogComponent} from '../task-log-dialog/task-log-dialog.component'
import {AuthService} from '../../auth.service'
import {Router} from '@angular/router'

@Component({
  selector: 'cmm-task-tracking-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks = []

  constructor( public http: HttpClient, public dialog: MatDialog, private auth: AuthService, public router: Router ) { }
  displayedColumns: string[] = [ 'actions', 'duration', 'user' ]

  ngOnInit(): void {
    if ( !this.auth.isLoggedIn ) {
      console.log( 'redirect' )
      this.router.navigate( [ '/login' ] )
      return
    }

    this.http.get( '/api/taskLogs' ).toPromise().then( (data: any) => {
      console.log( data.tasks )
      this.tasks = data.tasks

      this.tasks.forEach( task => {
        task.activeTaskLog = null
        // doesnt check if multiple task logs are active for a user,
        // since there shouldnt ever be
        task.activeTaskLog = task.taskLogs.find( log => log.start && !log.stop )
      })
    })
  }

  sortTaskLogs( taskLogs ): void {

    return taskLogs.sort( ( a, b ) => Date.parse( b.start ) - Date.parse( a.start ) )
  }

  startTaskLog( task ): void {
    const date = new Date()

    this.http.post( `/api/tasks/${ task.id }/taskLogs`, {} ).toPromise().then( (result: any) => {
      if ( !result || !result.taskLog )
        return

      task.activeTaskLog = result.taskLog
      // sort task logs by most recent start time
      task.taskLogs.push( result.taskLog )
      this.sortTaskLogs( task.taskLogs )
    })

    console.log( date, task.id )
  }

  stopTaskLog( task ): void {
    const date = new Date()

    this.http.patch( `/api/taskLogs/${ task.activeTaskLog.id }`, {} ).toPromise().then( (result: any) => {
      if ( !result )
        return

      // clear active task log
      task.activeTaskLog = null
      const taskIndex = task.taskLogs.findIndex( log => log.id === result.taskLog.id )
      if ( taskIndex === -1 )
        return

      task.taskLogs[ taskIndex ] = result.taskLog
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

      if ( result.delete ) {
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

  readableTime( time ): string {
    if ( !time )
      return ''

    const date = new Date( Date.parse( time ) )

    console.log( Intl.DateTimeFormat().resolvedOptions().timeZone )

    return `${ date.toLocaleString() }`
  }

  getDuration( start, stop ): string {
    const trueStart = new Date( start )
    const trueStop = new Date( stop )
    const seconds = ( trueStop.getTime() - trueStart.getTime() ) / 1000
    const minutes = seconds / 60
    const leftOverSeconds = seconds % 60
    const formattedMinutes = minutes.toFixed(0)

    let durationString = ''
    if ( formattedMinutes !== '0' )
      durationString +=  `${ formattedMinutes } min(s) `
    if ( leftOverSeconds )
      durationString += `${ leftOverSeconds } sec`

    return durationString
  }
}
