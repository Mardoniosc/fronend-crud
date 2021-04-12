import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cep'
})
export class CepPipe implements PipeTransform {
  transform(valor: string, args?: any): any {
    return valor.substr(0, 5) + '-' + valor.substr(5);
  }
}
