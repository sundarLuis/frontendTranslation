import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms'
import { User } from '../../models/user'
import { format } from 'url';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-control-panel',
  templateUrl: './user-control-panel.component.html',
  styleUrls: ['./user-control-panel.component.css'],
  providers: [UserService]
})
export class UserControlPanelComponent implements OnInit {
  edit: boolean = false
  showPass: boolean = false
  alert: boolean = false

  alertifyBody = {
    message: '',
    type: '',
  }
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getUser()
  }
  getUser() {
    this.userService.getUsers()
      .subscribe(res => {
        this.userService.users = res as User[]
      }, (err) => {

        let e = err.error.error ? err.error.error : err.error.status
        this.alertify(e, 2)

      })
  }

  saveUser(e, form?: NgForm) {
    if (form.value._id) {
      this.userService.putUser(form.value)
        .subscribe(res => {
          this.edit = false
          this.clearForm( e,form)
          this.getUser()
          this.alertify('edited successfull', 1)
        }, (err) => {

          let e = err.error.error ? err.error.error : err.error.status
          this.alertify(e, 2)
        })
    } else {
      this.userService.postUser(form.value)
        .subscribe(res => {
          this.clearForm( e,form)
          this.getUser()
          this.alertify('saved successfull', 1)
        }, (err) => {

          let e = err.error.error ? err.error.error : err.error.status
          this.alertify(e, 2)

        },
        )
    }
  }

  editUser(user: User) {
    this.edit = true
    this.userService.selectdUser = user
  }

  deleteUser(_id: string) {
    this.userService.deleteUser(_id)
      .subscribe(res => {
        this.alertify('deleted successfull', 1)
        this.getUser()
      }, (err) => {

        let e = err.error.error ? err.error.error : err.error.status
        this.alertify(e, 2)

      })
  }
  VerifyId(id_for_delete) {
    this.authService.tokenId()
      .subscribe(res => {
        if (id_for_delete != res.id_user) {
          this.deleteUser(id_for_delete)
        } else {
          this.alertify('cannot delete your user', 2)
        }
      }, (err) => {

        let e = err.error.error ? err.error.error : err.error.status
        this.alertify(e, 2)

      })
  }

  handleSelectedShowPass($event) {
    if ($event.target.checked === true) {
      this.showPass = true
    } else if ($event.target.checked === false) {
      this.showPass = false
    }
  }

  clearForm(e, form?: NgForm) {
    if (form) {
      form.reset();
      this.userService.selectdUser = new User()
      e.preventDefault()
    }
  }

  alertify(message, type) {

    if (type == 1) this.alertifyBody.type = 'alert-success'
    if (type == 2) this.alertifyBody.type = 'alert-danger'
    this.alertifyBody.message = message

    this.alert = true
    setInterval(() => {
      this.alert = false;
    }, 5000);
  }

}
