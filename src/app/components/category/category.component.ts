import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms'

import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
edit: boolean = false
alert: boolean = false

alertifyBody = {
  message: '',
  type: '',
}
  constructor(
    public categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.getCategories()
  }
  getCategories() {
    this.categoryService.getCategories()
        .subscribe(res =>{
          this.categoryService.categories = res as Category[]
        }, err => console.log(err))
  }
  saveCategory(e,form?:NgForm){
    if(form.value._id){
      this.categoryService.putCategory(form.value)
        .subscribe(res => {
          this.alertify('edited successfull', 1)
          this.edit = false
          this.clearForm( e,form)
          this.getCategories()
        }, err => console.log(err))
    }else{
      console.log(form.value)
      this.categoryService.postCategory(form.value)
          .subscribe(res => {
            this.alertify('saved successfull', 1)
            this.clearForm( e,form)
            this.getCategories()
          },err => console.log(err))
    }

  }

  editCategory(category:Category){
    this.edit = true
    this.categoryService.selectedCategory = category
  }
  deleteCategory(_id: string){
    this.categoryService.deleteCategory(_id)
      .subscribe(res =>{
        this.alertify('deleted successfull', 1)
        this.getCategories()
      },err => console.log(err))
  }
  clearForm(e,form ?:NgForm){
    if(form){
      form.reset();
      this.categoryService.selectedCategory = new Category()
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
