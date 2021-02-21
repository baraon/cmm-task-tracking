import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroupDirective, Validators} from '@angular/forms'

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

  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {
  }

  login( formDirective: FormGroupDirective ): void {
    console.log( formDirective.form.value )
    return
  }

}
