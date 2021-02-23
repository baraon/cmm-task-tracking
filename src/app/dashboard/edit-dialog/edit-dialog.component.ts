import {Component, Inject, OnInit} from '@angular/core'
import {Form, FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'cmm-task-tracking-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

  fields: FormGroup
  type: string
  operation: string
  apiCalls = {
    projects: {
      start: 'customers'
    },
    tasks: {
      start: 'projects'
    },
    customers: {
      start: 'customers'
    }
  }
  operationMessage = {
    customers: {
      add: 'Add Customer',
      edit: 'Edit Customer'
    },
    projects: {
      add: 'Add Project',
      edit: 'Edit Project'
    },
    tasks: {
      add: 'Add Task',
      edit: 'Edit Task'
    }
  }

  constructor( public dialogRef: MatDialogRef<EditDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private http: HttpClient,
               public fb: FormBuilder ) { }

  ngOnInit(): void {
    this.type = this.data.type
    this.operation = this.data.operation
    console.log( this.data )
    let id = -1
    if ( this.data.item && this.data.item.id )
      id = this.data.item.id

    if ( this.type === 'customers' ) {
      let name = ''
      if ( this.data.item && this.data.item.name )
        name = this.data.item.name

      this.fields = this.fb.group({
        name: [ name, Validators.required ],
        id: [ id ]
      })
    }
    else if ( this.type === 'projects' ) {
      let name = ''
      if ( this.data.item && this.data.item.name )
        name = this.data.item.name

      let parent = ''
      if ( this.data.context && this.data.context.parent )
        parent = this.data.context.parent

      this.fields = this.fb.group({
        name: [ name, Validators.required ],
        parent: [ parent ],
        id: [ id ]
      })
    }
    else if ( this.type === 'tasks' ) {
      let description = ''
      if ( this.data.item && this.data.item.description )
        description = this.data.item.description

      let parent = ''
      if ( this.data.context && this.data.context.parent )
        parent = this.data.context.parent

      this.fields = this.fb.group({
        description: [ description, Validators.required ],
        parent: [ parent ],
        id: [ id ]
      })
    }
  }

  formRouter( formDirective ): void {
    if ( this.operation === 'add' )
      this.add( formDirective )
    else if ( this.operation === 'edit' )
      this.edit( formDirective )
  }

  add( formDirective ): void {
    // check if form is valid and not empty

    const value = formDirective.form.value
    // forming url from presets declare above
    let url = `/api/${ this.apiCalls[ this.type ].start }`

    console.log( formDirective.form.value )
    if ( formDirective.form.value.parent )
      url += `/${ value.parent }/${ this.type }`

    console.log( url )

    this.http.post( url, value ).toPromise().then( (data: any) => {
      if ( !data ) {
        console.error( 'Error occurred adding to ' + this.type )
        return
      }

      this.dialogRef.close( { add: data } )
    })
  }



  edit( formDirective ): void {
    // check if form is valid and not empty
    const value = formDirective.form.value
    const url = `/api/${ this.type }/${ value.id }`

    this.http.patch( url, value ).toPromise().then( (data: any) => {
      if ( !data ) {
        console.error( 'Error occurred editing to ' + this.type )
        return
      }

      this.dialogRef.close( { edit: data } )
    })
  }

}
