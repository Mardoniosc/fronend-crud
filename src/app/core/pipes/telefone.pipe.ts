import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefone',
})
export class TelefonePipe implements PipeTransform {
  transform(fone) {
    if (fone.length === 11) {
      fone = fone.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');
    } else {
      fone = fone.replace(/^(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return fone;
  }
}
