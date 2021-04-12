import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { Endereco } from './endereco.model';

export class Cliente extends BaseResourceModel {
  constructor(
    public id?: number,
    public nome?: string,
    public cpf?: string,
    public enderecos?: Endereco[],
    public telefones?: string[],
    public emails?: string[]
  ) {
    super();
  }
}
