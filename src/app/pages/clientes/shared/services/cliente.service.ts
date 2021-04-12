import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { Cliente } from '../models/cliente.model';
import { environment as env } from 'src/environments/environment';
import { HttpUtilService } from 'src/app/shared/services/http-util.service';

@Injectable({
  providedIn: 'root',
})
export class ClienteService extends BaseResourceService<Cliente> {
  constructor(protected injector: Injector, protected httpUtil: HttpUtilService) {
    super(`${env.baseUrl}clientes`, injector, httpUtil);
  }
}
