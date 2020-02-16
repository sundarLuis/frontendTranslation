import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 private URL = "http://localhost:3000/api/user"
  constructor( private http: HttpClient,
    private router: Router) { }

  signUp( user ){
    return this.http.post<any>(this.URL + '/signUp', user)
  }
  signIn(user) {
    return this.http.post<any>(this.URL + '/signIn', user)
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
      return localStorage.getItem('token')
  }
  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/signin'])
  }
  tokenId(){
      return this.http.get<any>(this.URL + `/tokenId/${this.getToken()}`)
  }
}
