import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaDesafioComponent } from './pagina-desafio/pagina-desafio.component';

const routes: Routes = [{ path: '', component: PaginaDesafioComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
