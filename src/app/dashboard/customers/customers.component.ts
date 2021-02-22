import { Component, OnInit } from '@angular/core'
import {HttpClient} from '@angular/common/http'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import {EditDialogComponent} from '../edit-dialog/edit-dialog.component'
import {isArray} from 'rxjs/internal-compatibility'
import {DeleteDialogComponent} from '../delete-dialog/delete-dialog.component'

@Component({
  selector: 'cmm-task-tracking-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers = []

  constructor( public http: HttpClient, public dialog: MatDialog ) { }

  ngOnInit(): void {
    // specify how deep you want the nest to go
    const options = {
      all: 'true'
    }

    this.http.get( '/api/customers?all=true' ).toPromise().then( (data: any) => {
      if ( !data || !data.customers )
        return

      this.customers = data.customers
    })

  }

  addTask( projectId, customerId ): void {
    this.openEditDialog( null, 'tasks', 'add', { parent: projectId, context: customerId } )
    console.log( 'add task button click', projectId )
  }

  addProject( customerId ): void {
    this.openEditDialog( null, 'projects', 'add', { parent: customerId } )
    console.log( 'add project button click', customerId )
  }

  addCustomer( ): void {
    this.openEditDialog( null, 'customers' )
    console.log( 'add client button click' )
  }

  editItem( item, type, context = null ): void {
    this.openEditDialog( item, type, 'edit', { context } )
  }

  deleteItem( item, type, context = null ): void {
    this.openDeleteDialog( item, type, context )
  }

  openEditDialog( item = {}, type = null, operation = 'add', context = null ): void {
    const dialogRef = this.dialog.open( EditDialogComponent, {
      width: '400px',
      data: { item, type, operation, context }
    })

    dialogRef.afterClosed().subscribe( result => {
      if ( !result )
        return

      if ( result.add ) {
        if ( result.add.customer )
          this.customers.push( result.add.customer )
        else if ( result.add.project ) {
          const customerIndex = this.customers.findIndex( customer => customer.id === result.add.project.customer_id )
          if ( customerIndex === -1 )
            return

          if ( this.customers[ customerIndex ].projects && this.customers[ customerIndex ].projects.length > 0 )
            this.customers[ customerIndex ].projects.push( result.add.project )
          else
            this.customers[ customerIndex ].projects = [ result.add.project ] // if customer doesnt already have a projects field
        }
        else if ( result.add.task ) {
          const customerIndex = this.customers.findIndex( customer => customer.id === context.context )
          if ( customerIndex === -1 )
            return

          const projectIndex = this.customers[ customerIndex ].projects.findIndex( project => project.id === result.add.task.project_id )
          if ( projectIndex === -1 )
            return

          if ( this.customers[ customerIndex ].projects[ projectIndex ].tasks &&
              this.customers[ customerIndex ].projects[ projectIndex ].tasks.length > 0 )
            this.customers[ customerIndex ].projects[ projectIndex ].tasks.push( result.add.task )
          else
            this.customers[ customerIndex ].projects[ projectIndex ].tasks = [ result.add.task ]

        }
      }
      else if ( result.edit ) {
        if ( result.edit.customer ) {
          const index = this.customers.findIndex( customer => customer.id === result.edit.customer.id )

          if ( index === -1 )
            return

          this.customers[ index ] = result.edit.customer
        }
        else if ( result.edit.project ) {
          const customerIndex = this.customers.findIndex( customer => customer.id === result.edit.project.customer_id )
          console.log( 'customerIndex', customerIndex )
          if ( customerIndex === -1 )
            return

          const projectIndex = this.customers[ customerIndex ].projects.findIndex( project => project.id === result.edit.project.id )
          console.log( 'projectIndex', projectIndex )
          if ( projectIndex === -1 )
            return

          this.customers[ customerIndex ].projects[ projectIndex ] = result.edit.project
        }
        else if ( result.edit.task ) {
          // context is for task since we do not get back the full project from DB ( yet )
          const customerIndex = this.customers.findIndex( customer => customer.id === context.context )
          if ( customerIndex === -1 )
            return

          const projectIndex = this.customers[ customerIndex ].projects.findIndex( project => project.id === result.edit.task.project_id )
          if ( projectIndex === -1 )
            return

          const taskIndex = this.customers[ customerIndex ].projects[projectIndex]
              .tasks.findIndex( project => project.id === result.edit.task.id )
          if ( taskIndex === -1 )
            return

          this.customers[ customerIndex ].projects[ projectIndex ].tasks[ taskIndex ] = result.edit.task
        }
      }
    })
  }

  openDeleteDialog( item, type = null, context ): void {
    const dialogRef = this.dialog.open( DeleteDialogComponent, {
      width: '400px'
    })

    dialogRef.afterClosed().subscribe( result => {
      if ( !result || !result.deleteOkay )
        return

      const url = `/api/${ type }/${ item.id }`

      this.http.delete( url ).toPromise().then( (data: any) => {
        console.log( data )
        if ( type === 'customers') {
          const customerIndex = this.customers.findIndex( customer => customer.id === +data.id )
          if ( customerIndex === -1 )
            return

          this.customers.splice( customerIndex, 1 )
        }
        else if ( type === 'projects' ) {
          const customerIndex = this.customers.findIndex( customer => customer.id === item.customer_id )
          if ( customerIndex === -1 )
            return

          const projectIndex = this.customers[customerIndex].projects.findIndex( project => project.id === +data.id )
          if ( projectIndex === -1 )
            return

          this.customers[ customerIndex ].projects.splice( projectIndex, 1 )
        }
        else if ( type === 'tasks') {
          const customerIndex = this.customers.findIndex( customer => customer.id === context )
          if ( customerIndex === -1 )
            return

          const projectIndex = this.customers[customerIndex].projects.findIndex( project => project.id === item.project_id )
          if ( projectIndex === -1 )
            return

          const taskIndex = this.customers[ customerIndex ].projects[ projectIndex ].tasks.findIndex( task => task.id === +data.id )
          if ( taskIndex === -1 )
            return

          this.customers[ customerIndex ].projects[ projectIndex ].tasks.splice( taskIndex, 1 )
        }
      })
    })
  }
}
