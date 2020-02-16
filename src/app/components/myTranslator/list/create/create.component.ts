import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router';
import { ListService } from 'src/app/services/myTranslator/list.service'
import { TranslationService } from 'src/app/services/myTranslator/translation.service'
import { List } from 'src/app/models/myTranslator/list'
import { Translation } from 'src/app/models/myTranslator/translation'
declare var $: any;
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit { 
  translations = ''
  id_list = ''
  translation_ids = []
  constructor(
    public service: ListService,
    public serviceTranslation: TranslationService,
    private router : Router,
   
  ) { }

  ngOnInit() {
  }
  modal(){
    $('#exampleModal').modal('show');
  }
  saveTranslation(e, form?: NgForm){
    this.translations = ''
    // this.tranlations = 'test'
    console.log('saveTranslation')
    console.log(form.value)
    this.serviceTranslation.post_(form.value)
      .subscribe(res => {
        console.log(res)
        this.translation_ids.push(res)
      },err => console.log(err))
      setTimeout(() => {
        this.translation_ids.forEach(element => {
          this.serviceTranslation.getOne_(element)
          .subscribe(res => {
            console.log(res.translation)
            let cadena = res.translation + " "
            this.translations += cadena 
            this.clearFormTranslation(e, form)
            $('#exampleModal').modal('hide');
          },err => console.log(err))
        });
       }, 500);
 
  }
  save(e, form?: NgForm) {
    console.log(form.value)
    console.log(this.translation_ids.length)
    if(this.translation_ids.length >= 1){
     
        const bodyList = {
                  content: form.value.content,
                  ids_translation: this.translation_ids,
                  language: form.value.language,
                  type: form.value.type,
                }
                console.log(bodyList)
                this.service.post_(bodyList as List)
                  .subscribe(res => {
                    console.log(res)
                    // this.alertify('saved successfull', 1)
                   this.clearForm(e, false,form)
                   this.router.navigate(['/t_list']);
                  }, err => console.log(err))
    
   
    }

  }

    
  
  clearFormTranslation(e, form?: NgForm) {
    if (form) {
       form.reset();
      this.service.selectedList.ids_translation[0].translation = ''
      e.preventDefault()
    }
  }
  clearForm(e,params, form?: NgForm ) {
    if (form) {
      if(params) this.clearAll()
      form.reset();
      e.preventDefault()
    }
  }
  goBack(e, form?: NgForm){
    if (form) {
      this.clearAll()
      form.reset();
      e.preventDefault()
      this.router.navigate(['/t_list']);
    }
  }
  clearAll(){
    this.deleteTranslation()
    this.service.selectedList = new List()
    this.translation_ids = []
    this.translations = ''
  }
  deleteTranslation(){
    if(this.translation_ids.length >= 1){
      console.log('deleteTranslation if')
      this.translation_ids.forEach(element => {
        this.serviceTranslation.delete_(element)
        .subscribe(res => {
          console.log(res)
       
        }, err => console.log(err))
      });
    }else{
      console.log('deleteTranslation else')
      return
    }
  }
}
