import { NgModule } from '@angular/core';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [ClienteListComponent, ClienteFormComponent],
  imports: [ClientesRoutingModule, SharedModule, NgxMaskModule.forChild()],

  providers: [],
})
export class ClientesModule {}
