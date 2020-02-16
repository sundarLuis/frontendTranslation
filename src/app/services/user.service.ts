import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user'
@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[];
  selectdUser: User;
  private URL = "http://localhost:3000/api/user"
  constructor(
    private http: HttpClient,
  ) {
    this.selectdUser = new User();
   }

  getUsers() {
    return this.http.get<any>(this.URL )
  }
  getUser(id) {
    return this.http.get<any>(this.URL + `/${id}`)
  }
  postUser(users: User){
    return this.http.post(this.URL + `/signUp`,users)
  }
  putUser(user:User) {
    return this.http.put<any>(this.URL + `/${user._id}`, user)
  }
  deleteUser(_id:string){
    return this.http.delete<any>(this.URL + `/${_id}`)
  }

}
