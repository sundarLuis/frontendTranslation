import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  user = {
    email : '',
    password: ''
  }
  constructor( private autoService: AuthService,
    private router: Router ) {  }

  ngOnInit() {
  } 
  signIn(){

  if(this.user.email.length > 0 && this.user.password.length > 0)  {
    this.autoService.signIn(this.user)
    .subscribe(res => {
      console.log(res)
      localStorage.setItem('token',res.token)
      this.router.navigate(['/home']);
    },err =>{
      console.log(err)
    }
    )
  }else{
    console.log("empty fields")
  }
 
  }

}
