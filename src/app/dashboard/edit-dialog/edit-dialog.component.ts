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

  constructor( public dialogRef: MatDialogRef<EditDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private http: HttpClient,
               public fb: FormBuilder ) { }

  ngOnInit(): void {
    this.type = this.data.type
    this.operation = this.data.operation
    console.log( this.data )
    if ( this.type === 'projects' ) {
      let name = ''
      if ( this.data.item && this.data.item.name )
        name = this.data.item.name

      let parent = ''
      if ( this.data.item && this.data.item.customer_id )
        parent = this.data.item.customer_id

      this.fields = this.fb.group({
        name: [ name, Validators.required ],
        parent: [ parent ]
      })
    }
    else if ( this.type === 'customers' ) {
      let name = ''
      if ( this.data.item && this.data.item.name )
        name = this.data.item.name

      this.fields = this.fb.group({
        name: [ name, Validators.required ]
      })
    }
    else if ( this.type === 'tasks' ) {
      let description = ''
      if ( this.data.item && this.data.item.description )
        description = this.data.item.description

      let parent = ''
      if ( this.data.item && this.data.item.project_id )
        parent = this.data.item.project_id

      this.fields = this.fb.group({
        description: [ description, Validators.required ],
        parent: [ parent ]
      })
    }
  }

  // tslint:disable-next-line:typedef
  formRouter( formDirective ) {
    if ( this.operation === 'add' )
      this.add( formDirective )
    else if ( this.operation === 'edit' )
      this.edit( formDirective )
  }

  add( formDirective ): void {
    console.log(formDirective)

    // forming url from presets declare above
    let url = `/api/${this.apiCalls[this.type].start}`

    if ( formDirective.form.value.parent )
      url += `/${formDirective.form.value.parent}/${this.type}`

    const body = formDirective.form.value

    this.http.post( url, body ).toPromise().then( (data: any) => {
      if ( !data ) {
        console.log( 'Error happened' )
        return
      }

      this.dialogRef.close( data )
    })
  }



  edit( formDirective ): void {
    console.log( formDirective )
  }

}
