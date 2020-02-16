import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user = {
    _id:'',
    email : '',
    password: ''
  }
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
   this.getIdByToken()
  }

  getIdByToken(){
    this.authService.tokenId()
    .subscribe(res => this.User(res),err => console.log(err))
  }
  User(body){
    this.userService.getUser(body.id_user)
      .subscribe(res =>{
        const {_id,email,password} = res
        this.user.email = email
        this.user.password = password
        this.user._id = _id
      console.log(this.user)} ,err => console.log(err))

  }
  editedUser(form?: NgForm){
    this.userService.putUser(form.value)
          .subscribe( res => {this.router.navigate(['/home'])
          },err =>console.log(err))
  }

}
