import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutCadena'
})
export class CutCadenaPipe implements PipeTransform {

  transform(value: any): any {
    
      let salida: String = "";
      salida = value.split(" ")
      salida = `${salida[0]} ${salida[1]}...`
  
      return salida;
    
  }

}
