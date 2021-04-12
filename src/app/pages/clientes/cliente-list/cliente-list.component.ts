import { Component, OnInit } from '@angular/core';
import { Cliente } from '../shared/models/cliente.model';
import { ClienteService } from '../shared/services/cliente.service';
import toastr from 'toastr';
import { DadosUserLogado } from 'src/app/shared/models/dados-user-logado.mode';
import { StorageService } from 'src/app/shared/services/storage.service';
import { Router } from '@angular/router';
import { HttpUtilService } from 'src/app/shared/services/http-util.service';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css'],
})
export class ClienteListComponent implements OnInit {
  clientes: Cliente[] = [];

  dadosUserLogged: DadosUserLogado;

  perfil: string = '';

  constructor(
    private clienteService: ClienteService,
    private httpUtilService: HttpUtilService
  ) {}

  ngOnInit(): void {
    this.clienteService.getAll().subscribe(
      (data) => (this.clientes = data),
      (err) => {
        if(err.status === 403) {
          toastr.error('Acesso Negado', 'Erro ' + err.status)
        } else {
          toastr.error(err.error.message, 'Erro ' + err.status);
        }
      }
    );
      this.carregandoDadosUsuario()
  }

  carregandoDadosUsuario(): void {
    this.dadosUserLogged = this.httpUtilService.obterDadosUsuario();
    this.perfil = this.dadosUserLogged.perfil[0]
  }

  deleteCliente(cliente: Cliente) {
    const mustDelete = confirm('Deseja realmente excluir este item?');

    if (mustDelete) {
      this.clienteService.delete(cliente.id).subscribe(
        (data) => {
          this.clientes = this.clientes.filter((x) => x != cliente);
        },
        (err) => {
          if(err.status == 403) {
            toastr.error('Acesso Negado', 'Erro ' + err.status)
          } else {
            toastr.error(err.error.message, 'Erro ' + err.status);
          }
        }
      );
    }
  }
}
