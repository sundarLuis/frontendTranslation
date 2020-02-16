import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms'

import { TranslationService } from 'src/app/services/myTranslator/translation.service';
import { ListService } from 'src/app/services/myTranslator/list.service';
import { List } from 'src/app/models/myTranslator/list';
declare var $: any;
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  modalTranslations = ''
  updateTranslations = {
    _id: '',
    translation: ''
  }
  idParamsUrl = ''
  translations = ''
  id_list = ''
  translation_ids = []
  constructor(
    private activatedRoute: ActivatedRoute,
    public service: ListService,
    public serviceTranslation: TranslationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.idParamsUrl = this.activatedRoute.snapshot.params.id
    this.getList()
  }
  getList() {
    this.service.getOne_(this.idParamsUrl)
      .subscribe(res => {
        this.service.selectedList = res
      }, err => console.log(err))
  }

  modalTranslation(id, params) {
    console.log('modalTranslation')
    id ? this.modalTranslations = 'Edit' : this.modalTranslations = 'Create'
    this.updateTranslations._id = id
    this.updateTranslations.translation = params
    $('#exampleModal').modal('show');
  }
  saveTranslation() {
    if (this.updateTranslations.translation) {
      this.serviceTranslation.post_(this.updateTranslations)
        .subscribe(res => {
          let arrayIdsTranslation = []
          this.service.selectedList.ids_translation.forEach(element => {
            arrayIdsTranslation.push(element._id)
          });
          this.service.selectedList.ids_translation = [...arrayIdsTranslation, res]

          this.service.put_(this.service.selectedList)
            .subscribe(res => { }, err => console.log(err))
          this.getList()
          $('#exampleModal').modal('hide');

        }, err => console.log(err))
    }

  }
  updateTranslation() {
    console.log('editTranslation', this.updateTranslations)
    this.serviceTranslation.put_(this.updateTranslations)
      .subscribe(res => {
        $('#exampleModal').modal('hide');
        this.getList()
      }, err => console.log(err))
  }
  save(e, form?: NgForm) {

    form.value.statusCreating = true
    console.log(form.value)
    this.service.put_(form.value)
      .subscribe(res => {
        this.router.navigate(['/t_list']);
      }, err => console.log(err))
  }


  goBack(e, form?: NgForm) {
    if (form) {
      this.clearAll()
      form.reset();
      e.preventDefault()
      this.router.navigate(['/t_list']);
    }
  }
  clearAll() {
    this.service.selectedList = new List()
    this.translation_ids = []
    this.translations = ''
  }
  deleteTranslation(id) {
    this.serviceTranslation.delete_(id)
      .subscribe(res => {
        console.log(res)
        this.getList()

      }, err => console.log(err))
  }

}
