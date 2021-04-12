import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaDesafioComponent } from './pagina-desafio.component';

describe('PaginaDesafioComponent', () => {
  let component: PaginaDesafioComponent;
  let fixture: ComponentFixture<PaginaDesafioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaDesafioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaDesafioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
