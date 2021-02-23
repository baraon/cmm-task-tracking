import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import { HttpClient} from '@angular/common/http'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'cmm-task-tracking-task-log-dialog',
  templateUrl: './task-log-dialog.component.html',
  styleUrls: ['./task-log-dialog.component.css']
})
export class TaskLogDialogComponent implements OnInit {
  operation: string
  taskId: number
  log: any
  fields: FormGroup

  constructor( public dialogRef: MatDialogRef<TaskLogDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private http: HttpClient,
               public fb: FormBuilder ) { }

  ngOnInit(): void {
    console.log( this.data )
    this.operation = this.data.operation
    this.taskId = this.data.taskId
    let duration = 0
    if ( this.data.log ) {
      this.log = this.data.log
      duration = this.data.log.duration_minutes
    }

    this.fields = this.fb.group({
      duration: [ duration, Validators.required ]
    })

  }

  // either add or edit
  formRouter( formDirective ): void {
    if ( this.operation === 'add' )
      this.addTaskLog( formDirective )
    else if ( this.operation === 'edit' )
      this.editTaskLog( formDirective )
  }

  addTaskLog( formDirective ): void {
    const value = formDirective.form.value

    this.http.post( `/api/tasks/${ this.taskId }/taskLogs`, value ).toPromise().then( (data: any) => {
      if ( !data ) {
        console.error( 'Error occurred adding task log' )
        return
      }

      this.dialogRef.close( { add: data } )
    })
  }

  editTaskLog( formDirective ): void {
    const value = formDirective.form.value

    this.http.patch( `/api/taskLogs/${ this.log.id }`, value ).toPromise().then( (data: any) => {
      if ( !data ) {
        console.error( 'Error occurred editing task log' )
        return
      }

      this.dialogRef.close( { edit: data } )
    })
  }

  // delete only
  deleteTaskLog(): void {
    this.http.delete( `/api/taskLogs/${ this.log.id }` ).toPromise().then( (data: any) => {
      if ( !data ) {
        console.error( 'Error occurred deleting task log.' )
        return
      }

      this.dialogRef.close( { delete: data } )
    })
  }

}
