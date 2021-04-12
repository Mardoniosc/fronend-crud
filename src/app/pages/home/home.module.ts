import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { PaginaDesafioComponent } from './pagina-desafio/pagina-desafio.component';

@NgModule({
  declarations: [PaginaDesafioComponent],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
