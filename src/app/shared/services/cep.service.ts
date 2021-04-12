import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CEP } from '../models/cep.model';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  private baseCep = 'https://viacep.com.br/ws/'
  constructor(private http: HttpClient) { }

  getByEnderecoToCep(cep: string): Observable<CEP> {
    const url = `${this.baseCep}${cep}/json`;
    return this.http
      .get(url)
      .pipe(catchError(this.handleError), map(this.jsonDataToCEP));
  }

  private jsonDataToCEP(jsonData: any[]): CEP {
    return (jsonData as unknown) as CEP;
  }

  protected handleError(error: any): Observable<any> {
    return throwError(error);
  }
}
