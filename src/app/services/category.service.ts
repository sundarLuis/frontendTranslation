import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Category} from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  //var global
    categories :Category[];
    selectedCategory: Category;
    private URL = "http://localhost:3000/api/typeMoney"

  constructor(
    private htttp:HttpClient
  ) { 
    this.selectedCategory = new Category();
  }
  getCategories(){
    return this.htttp.get<any>(this.URL)
  }
  getCategory(id:string){
    return this.htttp.get<any>(this.URL + `/${id}`)
  }
  postCategory(category : Category){
    return this.htttp.post(this.URL,category)
  }
  putCategory(category: Category){
    return this.htttp.put<any>(this.URL + `/${category._id}`,category)
  }
  deleteCategory(_id:string){
    return this.htttp.delete<any>(this.URL + `/${_id}`)
  }
}
