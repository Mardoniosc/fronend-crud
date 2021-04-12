import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import toastr from 'toastr';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private storageService: StorageService, private router: Router) {}

  canActivate(): boolean {
    const userLogged = this.storageService.getLocalUser();
    if (userLogged && userLogged.perfil[0] === 'ADMIN') {
      return true;
    }
    toastr.error('Acesso a está rota não autorizada para seu perfil', 'Erro 403')
    this.router.navigate(['/clientes']);
    return false;
  }
}
