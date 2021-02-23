import {Component, Inject, OnInit} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'

@Component({
  selector: 'cmm-task-tracking-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  type: string
  name: string

  operationMessage = {
    customers: {
      title: 'Are you sure you want to delete this customer?',
      subtitle: 'Deleting this customer will remove all of these related entries:',
      entries: [ 'Projects', 'Tasks', 'Task Logs' ]
    },
    projects: {
      title: 'Are you sure you want to delete this project?',
      subtitle: 'Deleting this project will remove all of these related entries:',
      entries: [ 'Tasks', 'Task Logs' ]
    },
    tasks: {
      title: 'Are you sure you want to delete this task?',
      subtitle: 'Deleting this task will remove all of these related entires:',
      entries: [ 'Task Logs' ]
    }
  }

  constructor( public dialogRef: MatDialogRef<DeleteDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any ) { }

  ngOnInit(): void {
    console.log( this.data )
    this.type = this.data.type
    this.name = this.data.item.name || this.data.item.description
  }

  closeDialog( answer = false ): void  {
    this.dialogRef.close({ deleteOkay: answer })
  }

}
