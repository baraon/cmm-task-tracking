import { Component, OnInit } from '@angular/core'
import {HttpClient} from '@angular/common/http'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {EditDialogComponent} from '../edit-dialog/edit-dialog.component'

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

  addTask( projectId ): void {
    this.openEditDialog( null, 'tasks' )
    console.log( 'add task button click', projectId )
  }

  addProject( customerId ): void {
    this.openEditDialog( null, 'projects' )
    console.log( 'add project button click', customerId )
  }

  addCustomer(): void {
    this.openEditDialog( null, 'customers' )
    console.log( 'add client button click' )
  }

  editItem( item, type ): void {
    console.log( item, type )
    this.openEditDialog( item, type, 'edit' )
  }

  deleteItem( item, type ): void {
    console.log( item, type, 'delete' )
  }

  openEditDialog( item = {}, type = null, operation = 'add' ): void {
    const dialogRef = this.dialog.open( EditDialogComponent, {
      width: '400px',
      data: { item, type, operation }
    })

    dialogRef.afterClosed().subscribe( result => {
      if ( result.customer )
        this.customers.push( result.customer )
    })
  }
}
