import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hidePassword'
})
export class HidePasswordPipe implements PipeTransform {

  transform(value: any, activar: boolean = true): any {
    if (activar) {
      let salida: String = "";
      for (let i = 0; i < value.length; i++) {
        salida += "*";
      }
      return salida;
    } else {
      return value
    }

  }
}
