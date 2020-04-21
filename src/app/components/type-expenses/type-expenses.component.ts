import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms'
import { TypeExpenseService } from 'src/app/services/type-expense.service';
import { TypeExpense } from 'src/app/models/type-expense';

@Component({
  selector: 'app-type-expenses',
  templateUrl: './type-expenses.component.html',
  styleUrls: ['./type-expenses.component.css']
})
export class TypeExpensesComponent implements OnInit {
  edit: boolean = false
  alert: boolean = false
  
  alertifyBody = {
    message: '',
    type: '',
  }
  constructor(
    public typeExpenseService: TypeExpenseService
  ) { }

  ngOnInit() {
    this.getTypeExpenses()
  }
  getTypeExpenses() {
    this.typeExpenseService.getTypeExpenses()
        .subscribe(res =>{
          this.typeExpenseService.typeExpense = res as TypeExpense[]
        }, err => console.log(err))
  }
  saveTypeExpense(e,form?:NgForm){
    if(form.value._id){
      this.typeExpenseService.putTypeExpense(form.value)
        .subscribe(res => {
          this.alertify('edited successfull', 1)
          this.edit = false
          this.clearForm( e,form)
          this.getTypeExpenses()
        }, err => console.log(err))
    }else{
      console.log(form.value)
      this.typeExpenseService.postTypeExpense(form.value)
          .subscribe(res => {
            this.alertify('saved successfull', 1)
            this.clearForm( e,form)
            this.getTypeExpenses()
          },err => console.log(err))
    }

  }
  editTypeExpense(typeExpense:TypeExpense){
    this.edit = true
    this.typeExpenseService.selectedTypeExpense = typeExpense
  }
  deleteTypeExpense(_id: string){
    this.typeExpenseService.deleteTypeExpense(_id)
      .subscribe(res =>{
        this.alertify('deleted successfull', 1)
        this.getTypeExpenses()
      },err => console.log(err))
  }
  clearForm(e,form ?:NgForm){
    if(form){
      form.reset();
      this.typeExpenseService.selectedTypeExpense = new TypeExpense()
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
