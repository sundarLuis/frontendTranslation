import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'

import { ListService } from 'src/app/services/myTranslator/list.service'
import { TranslationService } from 'src/app/services/myTranslator/translation.service'
import { List } from 'src/app/models/myTranslator/list'
import { Translation } from 'src/app/models/myTranslator/translation'

import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  filters = {
    language:'',
    type:'',
  }
  lengthList : number = 0
  edit: boolean = false
  alert: boolean = false
  searchTypeChange:boolean = false
serchInput: string = ''
  alertifyBody = {
    message: '',
    type: false,
  }

  public selectType = {
    select: 0,
    body: [1, 2]
  }
  constructor(
    public service: ListService,
    public serviceTranslation: TranslationService,
    private router : Router
  ) { }

  ngOnInit() {
    this.List()
  }
  modalFiltres(){
    $('#filtresModal').modal('show');
  }
  buttonSearch(){
    this.search(this.serchInput)
    $('#filtresModal').modal('hide');
  }
  search(word){
    this.service.search_(word)
    .subscribe(res=>{
      this.service.listes = res.List as List[]
      this.service.translations = res.Translation as List[]
    },err=>console.log(err))
  }
  filter(obj){
    this.service.filter_(obj)
    .subscribe(res=>{
      this.service.listes = res as List[]
    },err=>console.log(err))
  }
  radioChangeHandler(event: any){
    const filter = event.target.value
    switch (event.target.value) {
      case 'all':
            this.filters.language = ''
            this.filter(this.filters)
        break;
      case 'spanish':
        this.filters.language = filter
        
        this.filter(this.filters)
        break;
      case 'english':
        this.filters.language = filter
            this.filter(this.filters)
        break;

      // case 'paragraph':
      //       this.filter({"type":filter})
      //   break;
      // case 'word':
      //       this.filter({"type":filter})
      //   break;

      case 'normal':
        this.searchTypeChange = false
        this.List()
        break;
      case 'change':
        this.List()
        this.serchInput = ""
        this.searchTypeChange = true
        break;
      default:
        break;
    }

  }
  somethingChanged(obj){
    if(this.searchTypeChange){
      if(obj){
         this.search(obj)
      } else {
        this.List()
      }
    }
   
  }
  radioChangeHandler2(event: any){
    const filter = event.target.value
    switch (event.target.value) {
      case 'all':
        this.filters.type = ''
        this.filter(this.filters)
        break;
      case 'paragraph':
        this.filters.type = filter
        this.filter(this.filters)
           
        break;
      case 'word':
        this.filters.type = filter
        this.filter(this.filters)
           
        break;
    
    }

  }

  routingCreateList(){
   // this.router.navigate(['/t_listCreate'])
   const newList = {content:"new empty",statusCreating:false}
   this.service.post_(newList as List)
   .subscribe(res =>{
      this.List()
   },err => console.log(err))
  }
  routingUpdateList(id){
    this.router.navigate(['/t_listUpdate',id]);
  }
  deletedList(id){
    this.service.delete_(id)
    .subscribe(res =>{
       this.List()
    },err => console.log(err))
  }
  List() {
    this.service.getAll_()
      .subscribe(res => {
        this.service.listes = res as List[]
        this.lengthList = res.length
      }, err => console.log(err))
  }

  edit_(list: List) {
    this.edit = true
    this.service.selectedList = list
  }
  clearForm(e, form?: NgForm) {
    if (form) {
      form.reset();
      this.service.selectedList = new List()
      e.preventDefault()
    }
  }


}
