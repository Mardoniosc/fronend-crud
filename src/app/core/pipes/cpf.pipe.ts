import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpf'
})
export class CpfPipe implements PipeTransform {
  private readonly _REGEX_CPF = new RegExp(/(\d{3})(\d{3})(\d{3})(\d{2})/);
  private readonly _REGEX_CNPJ = new RegExp(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/
  );

  transform(valor: any, ...parametros: any[]): any {
    if (valor == null) {
      return;
    }
    let cpfFormatado: string = valor.toString();

    if (cpfFormatado) {
      if (this._REGEX_CPF.test(cpfFormatado)) {
        return cpfFormatado.replace(this._REGEX_CPF, '$1.$2.$3-$4');
      }
    }

    return cpfFormatado;
  }
}
