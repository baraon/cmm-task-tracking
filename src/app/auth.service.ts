import { BehaviorSubject } from 'rxjs'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userId: number
  user: any

  isLoggedIn = false
  isLoggedIn$ = new BehaviorSubject( this.isLoggedIn )

  constructor( public http: HttpClient ) { }

  init(): Promise<any> {
    return this.http.get( '/api/me' ).toPromise().then( (data: any) => {
      this.setUser( data )
      return Promise.resolve()
    })
  }

  private loggedIn( status: boolean ): void {
    this.isLoggedIn = status
    this.isLoggedIn$.next(status)
  }

  setUser( data: any ): void {
    if ( data  ) {
      this.user = data
      this.userId = data.id
      this.loggedIn( true )
    } else {
      this.user = undefined
      this.userId = undefined
      this.loggedIn( false )

      sessionStorage.clear()
    }
  }
}
