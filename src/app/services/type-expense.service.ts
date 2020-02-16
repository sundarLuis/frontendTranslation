import { Injectable } from '@angular/core';
import {TypeExpense} from '../models/type-expense';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TypeExpenseService {
  //var global
  typeExpense :TypeExpense[];
  selectedTypeExpense: TypeExpense;
  private URL = "http://localhost:3000/api/typeExpenses"
  constructor(
    private htttp:HttpClient
  ) {
    this.selectedTypeExpense = new TypeExpense();
   }
   getTypeExpenses(){
    return this.htttp.get<any>(this.URL)
  }
  getTypeExpense(id:string){
    return this.htttp.get<any>(this.URL + `/${id}`)
  }
  postTypeExpense(typeExpense : TypeExpense){
    return this.htttp.post(this.URL,typeExpense)
  }
  putTypeExpense(typeExpense: TypeExpense){
    return this.htttp.put<any>(this.URL + `/${typeExpense._id}`,typeExpense)
  }
  deleteTypeExpense(_id:string){
    return this.htttp.delete<any>(this.URL + `/${_id}`)
  }
}
