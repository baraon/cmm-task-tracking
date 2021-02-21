import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms'
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'signup-component',
  templateUrl: './signup.component.html',
  styleUrls: [ '../landing.css', './signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm = this.fb.group({
    email: [ '', Validators.required ],
    password: [ '', Validators.required ]
  })

  constructor( private fb: FormBuilder, private http: HttpClient ) { }

  ngOnInit(): void {
  }

  signUp( formDirective: FormGroupDirective ): void {
    if ( !formDirective.form.valid )
      return

    const body = {
      email: formDirective.form.value.email,
      password: formDirective.form.value.password
    }

    this.http.post( '/api/users', body, { responseType: 'text' } ).toPromise().then( ( data: any ) => {
      console.log( data )
    }).catch( err => {
      console.log( err )
    })
  }

}
