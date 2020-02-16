import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {List} from '../../models/myTranslator/list';
@Injectable({
  providedIn: 'root'
})
export class ListService {
//var global
listes:List[];
translations:List[];
selectedList: List;
private URL = "http://localhost:3000/api/myTranslator/list"
//contructor initialization TranslationService

  constructor(private http:HttpClient) {
    this.selectedList = new List();
   }
   getAll_(){
     return this.http.get<any>(this.URL)
   }
   getOne_(id:string){
    return this.http.get<any>(this.URL + `/${id}`)
   }
   post_(list : List){
     return this.http.post(this.URL, list)
   }
   put_(list: List){
     return this.http.put<any>(this.URL + `/${list._id}`,list)
   }
   delete_(_id:string){
     return this.http.delete<any>(this.URL + `/${_id}`)
   }
   search_(word:string){
     return this.http.get<any>(`${this.URL}/search/${word}`)
   }
   filter_(list : any){
    return this.http.post(`${this.URL}/filter`, list)
  }
}
