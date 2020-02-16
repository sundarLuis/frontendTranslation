import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Translation} from '../../models/myTranslator/translation';
@Injectable({
  providedIn: 'root'
})
export class TranslationService {
//var global
  translations:Translation[];
  selectedTranslation: Translation;
  private URL = "http://localhost:3000/api/myTranslator/translation"
  //contructor initialization TranslationService
  constructor( private http:HttpClient) {
    this.selectedTranslation = new Translation();
   }
   getAll_(){
    return this.http.get<any>(this.URL)
   }
   getOne_(id:string){
    return this.http.get<any>(this.URL + `/${id}`)
   }
   post_(translation ){
     return this.http.post(this.URL, translation)

   }
   put_(translation){
     return this.http.put<any>(this.URL + `/${translation._id}`,translation)
   }
   delete_(_id:string){
     return this.http.delete<any>(this.URL + `/${_id}`)
   }
}
