import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Cliente } from './pages/clientes/shared/models/cliente.model';

export class InMemoryDatabase implements InMemoryDbService {
  createDb() {
    const clientes: Cliente[] = [
      {
        id: 1,
        nome: 'Maria Santos Costa',
        cpf: '22233322233',
        enderecos: [
          {
            id: 1,
            logradouro: 'Rua Flores',
            numero: '300',
            complemento: 'Apto 303',
            bairro: 'Jardim',
            cep: '38220834',
            cidade: 'Brasilia',
            estado: 'DF',
          },
        ],
        telefones: ['6122223333', '61998887777'],
        emails: [
          'email3@empresa.com',
          'email2@hotmail.com',
          'email1@gmail.com',
        ],
      },
      {
        id: 2,
        nome: 'Maria Filomena da Conceição',
        cpf: '02233322233',
        enderecos: [
          {
            id: 1,
            logradouro: 'Rua Flores',
            numero: '300',
            complemento: 'Apto 303',
            bairro: 'Jardim',
            cep: '38220834',
            cidade: 'Brasilia',
            estado: 'DF',
          },
        ],
        telefones: ['6122223333', '61988887777'],
        emails: [
          'email3@empresa.com',
          'email2@hotmail.com',
          'email1@gmail.com',
        ],
      },
      {
        id: 3,
        nome: 'João Miguel Alcantara',
        cpf: '22233344455',
        enderecos: [
          {
            id: 2,
            logradouro: 'Avenida Matos',
            numero: '105',
            complemento: 'sala 800',
            bairro: 'centro',
            cep: '38777012',
            cidade: 'Brasilia',
            estado: 'DF',
          },
        ],
        telefones: ['6122223333', '61958887777'],
        emails: [
          'email3@empresa.com',
          'email2@hotmail.com',
          'email1@gmail.com',
        ],
      },
    ];
    return { clientes };
  }
}
