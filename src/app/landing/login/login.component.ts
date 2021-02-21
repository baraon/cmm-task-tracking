import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { AuthService } from '../../auth.service'

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: [ '../landing.css', './login.component.css' ]
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: [ '', Validators.required ],
    password: [ '', Validators.required ]
  })

  constructor( private fb: FormBuilder, public http: HttpClient, private router: Router, public auth: AuthService ) { }

  ngOnInit(): void {
    console.log( this.auth )
  }

  login( formDirective: FormGroupDirective ): void {
    if ( !formDirective.form.valid )
      return

    const body = {
      email: formDirective.form.value.email,
      password: formDirective.form.value.password
    }

    this.http.post( '/auth/login', body ).toPromise().then( (data: any) => {
      if ( !data )
        throw new Error('Could not connect to server')

      this.auth.setUser( data.user )

      this.router.navigate( ['/dashboard'] )
    }).catch( err => {
      return Promise.reject( err )
    })
  }

}
