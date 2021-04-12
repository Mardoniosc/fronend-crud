import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from './login.model';
import { environment as env } from '../../../../environments/environment';
import { tap } from 'rxjs/operators';
import { StorageService } from 'src/app/shared/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly PATH: string = 'login';

  constructor(
    private http: HttpClient,
    private storangeService: StorageService
  ) {}

  logar(login: Login): Observable<any> {
    return this.http
      .post(env.baseUrl + this.PATH, login, {
        observe: 'response',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Expose-Headers': 'Authorization',
        },
      })
      .pipe(
        tap((resp) => {
          let berarToken = resp.headers.get('Authorization').toString();
          const [, token] = berarToken.split(' ');
          this.storangeService.setLocalToken(token);
          return resp;
        })
      );
  }
}
