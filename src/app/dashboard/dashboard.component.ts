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
  }

  ngOnInit(  ): void {
    console.log( 'logged in?', this.auth.isLoggedIn )
    if ( !this.auth.isLoggedIn )
      this.router.navigate( [ '/login' ] )
  }

  logout(): void {
    this.auth.logout()
  }

}
