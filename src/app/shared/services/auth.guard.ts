import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private storageService: StorageService, private router: Router) {}

  canActivate(): boolean {
    const userLogged = this.storageService.getLocalUser();
    const userToken = this.storageService.getLocalToken();
    if(userLogged && userToken) {
      return true;
    }
    this.storageService.setLocalToken(null)
    this.storageService.setLocalUser(null)
    this.router.navigate(['/login'])
    return false;
  }

}
