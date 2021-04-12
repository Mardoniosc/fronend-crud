export class DadosUserLogado {
  constructor(
    public id: number,
    public exp: number,
    public usuario: string,
    public perfil: string[],
  ) {}
}
