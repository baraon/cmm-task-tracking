import { Component, OnInit } from '@angular/core'
import {AuthService} from '../auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'dashboard-component',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor( private auth: AuthService, public router: Router ) {
    if ( !this.auth.isLoggedIn )
      router.navigate( [ '/login' ] )


  }

  ngOnInit(  ): void {
  }

}
