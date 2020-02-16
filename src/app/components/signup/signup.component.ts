import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user = {
    email : '',
    password: ''
  }
  constructor( private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }
  signUp(){
    if(this.user.email.length > 0 && this.user.password.length > 0)  {
      this.authService.signUp(this.user)
      .subscribe(res => {
        console.log(res.token)
        localStorage.setItem('token', res.token);
      this.router.navigate(['list/signin']);
      },err =>{ console.log(err)})
    }else {
      console.log("empty fields")
    }
  
  }
}
