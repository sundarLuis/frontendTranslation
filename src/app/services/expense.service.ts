import { Injectable } from '@angular/core';
import { Expense } from '../models/expense';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
 //var global
 expense :Expense[];
 selectedExpense: Expense;
 private URL = "http://localhost:3000/api/expenses"
  constructor(
    private http:HttpClient
  ) {
    this.selectedExpense = new Expense()
   }
   getExpenses(){
    return this.http.get<any>(this.URL)
  }
  getExpense(id:string){
    return this.http.get<any>(this.URL + `/${id}`)
  }
  postExpense(expense : Expense){
    return this.http.post(this.URL,expense)
  }
  putExpense(expense: Expense){
    return this.http.put<any>(this.URL + `/${expense._id}`,expense)
  }
  deleteExpense(_id:string){
    return this.http.delete<any>(this.URL + `/${_id}`)
  }
}
