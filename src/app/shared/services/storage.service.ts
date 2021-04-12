import { Injectable } from '@angular/core';
import { Login } from 'src/app/pages/login/shared/login.model';
import { STORAGE_KEYS } from '../config/storange-keys.config';
import { DadosUserLogado } from '../models/dados-user-logado.mode';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getLocalUser(): DadosUserLogado {
    const usr = localStorage.getItem(STORAGE_KEYS.localUser);

    if (usr == null) {
      return null;
    }

    return JSON.parse(usr);
  }

  setLocalUser(obj: DadosUserLogado): void {
    if (obj == null) {
      localStorage.removeItem(STORAGE_KEYS.localUser);
      return;
    }

    localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
  }


  getLocalToken(): string {
    const usr = localStorage.getItem(STORAGE_KEYS.tokenUser);

    if (usr == null) {
      return null;
    }

    return JSON.parse(usr);
  }

  setLocalToken(token: string): void {
    if (token == null) {
      localStorage.removeItem(STORAGE_KEYS.tokenUser);
      return;
    }

    localStorage.setItem(STORAGE_KEYS.tokenUser, JSON.stringify(token));
  }
}
