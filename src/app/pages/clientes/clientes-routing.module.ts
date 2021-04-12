import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/shared/services/admin.guard';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ClienteListComponent } from './cliente-list/cliente-list.component';

const routes: Routes = [
  { path: '', component: ClienteListComponent, canActivate: [AuthGuard] },
  { path: 'new', component: ClienteFormComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: ':id/edit', component: ClienteFormComponent, canActivate: [AuthGuard, AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
