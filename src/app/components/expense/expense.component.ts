import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'src/app/services/expense.service';
import { Expense } from 'src/app/models/expense';
import { NgForm } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';
import { TypeExpenseService } from 'src/app/services/type-expense.service';
import { TypeExpense } from 'src/app/models/type-expense';
import { CompileMetadataResolver } from '@angular/compiler';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {
  edit: boolean = false
  alert: boolean = false
  
  alertifyBody = {
    message: '',
    type: '',
  }
  constructor(
    public expenseService: ExpenseService,
    public categoryService:CategoryService,
    public typeExpenseService: TypeExpenseService
  ) { }

  ngOnInit() {
    this.getExpenses()
    this.getCategories()
    this.getTypeExpenses()
  }
  getCategories() {
    this.categoryService.getCategories()
        .subscribe(res =>{
          console.log(res)
          this.categoryService.categories = res as Category[]
        }, err => console.log(err))
  }
  getTypeExpenses() {
    this.typeExpenseService.getTypeExpenses()
        .subscribe(res =>{
          this.typeExpenseService.typeExpense = res as TypeExpense[]
        }, err => console.log(err))
  }
  getExpenses(){
    this.expenseService.getExpenses()
      .subscribe(res =>{
        this.expenseService.expense = res as Expense[]
        console.log("expenseService")
        console.log(res)
      },err => console.log(err))
  }
  saveExpense(e,form? :NgForm){
    console.log(form)
    if(form.value._id){
      this.expenseService.putExpense(form.value)
        .subscribe(res => {
          this.alertify('edited successfull', 1)
          this.edit = false
          this.clearForm( e,form)
          this.getExpenses()
        }, err => console.log(err))
    }else{
      console.log(form.value)
      this.expenseService.postExpense(form.value)
          .subscribe(res => {
            this.alertify('saved successfull', 1)
            this.clearForm( e,form)
            this.getExpenses()
          },err => console.log(err))
    }
  }
  editExpense(expense:Expense){
    this.edit = true
    this.expenseService.selectedExpense = expense
  }
  deleteExpense(_id: string){
    this.expenseService.deleteExpense(_id)
      .subscribe(res =>{
        this.alertify('deleted successfull', 1)
        this.getExpenses()
      },err => console.log(err))
  }
  clearForm(e,form ?:NgForm){
    if(form){
      form.reset();
      this.expenseService.selectedExpense =new Expense()
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
