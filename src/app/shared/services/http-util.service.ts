import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import { DadosUserLogado } from '../models/dados-user-logado.mode';

@Injectable({
  providedIn: 'root',
})
export class HttpUtilService {
  constructor(private storageService: StorageService) {}

  headers() {
    let httpHeaders: HttpHeaders = new HttpHeaders();

    if (this.storageService.getLocalToken()) {
      httpHeaders = httpHeaders.set(
        'Authorization',
        'Bearer ' + this.storageService.getLocalToken(),

      ).set(
        'contentType', 'application/json'
      );
    }

    return { headers: httpHeaders };
  }

  obterDadosUsuario(): DadosUserLogado {
    if (!this.storageService.getLocalToken()) {
      return;
    }

    return JSON.parse(atob(this.storageService.getLocalToken().split('.')[1]));
  }

  obterPerfil(): string {
    if(!this.storageService.getLocalToken()) {
      return '';
    }

    const dadosUsuario: DadosUserLogado = this.obterDadosUsuario();
    return dadosUsuario ? dadosUsuario.perfil[0] : '';
  }
}
