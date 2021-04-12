import { Component, OnInit, AfterContentChecked } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs/operators';
import { CEP } from 'src/app/shared/models/cep.model';
import { CepService } from 'src/app/shared/services/cep.service';
import toastr from 'toastr';
import { Cliente } from '../shared/models/cliente.model';
import { Endereco } from '../shared/models/endereco.model';
import { ClienteService } from '../shared/services/cliente.service';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css'],
})
export class ClienteFormComponent implements OnInit {
  currentAction: string;
  clienteForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  cliente: Cliente = new Cliente();
  enderecoCapturadoPorCep: CEP = {} as CEP;
  endereco: Endereco = {} as Endereco;

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private cepService: CepService
  ) {}

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildClienteForm();
    this.loadCliente();
  }

  ngAfterContentChecked() {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;

    if (this.currentAction === 'new') {
      this.createCliente();
    } else {
      this.updateCliente();
    }
  }

  buscarCep(cep: string) {
    cep = cep.replace(/[^0-9]/g, '');
    if (cep.length > 7) {
      this.cepService.getByEnderecoToCep(cep).subscribe(
        (end) => {
          if(end['erro']) {
            toastr.error('Cep informado não encontrado', 'Erro 404')
            return;
          }
          this.enderecoCapturadoPorCep = end;
          this.loadEnderecoBuscaCep();
        },
        (err) =>
          toastr.err(
            'Erro ao buscar dados do cep informado',
            'Erro ' + err.status
          )
      );
    }
  }

  // PRIVATE METHODS

  private setCurrentAction() {
    if (this.route.snapshot.url[0].path === 'new') {
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }
  }

  private buildClienteForm() {
    this.clienteForm = this.formBuilder.group({
      id: [null],
      nome: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      cpf: [null, [Validators.required]],
      telefones: this.formBuilder.array([]),
      emails: this.formBuilder.array([]),
      enderecos: this.formBuilder.array([
        this.formBuilder.group({
          id: [null],
          logradouro: [null, Validators.required],
          numero: [null, Validators.required],
          complemento: [null],
          bairro: [null, Validators.required],
          cep: [null, Validators.required],
          cidade: [null, Validators.required],
          estado: [null, Validators.required],
        }),
      ]),
    });
  }

  addEmail(mail: string) {
    const email = this.clienteForm.controls.emails as FormArray;
    email.push(new FormControl(mail, [Validators.required, Validators.email]));
  }

  addTelefone(fone: string) {
    const telefone = this.clienteForm.controls.telefones as FormArray;
    telefone.push(new FormControl(fone, Validators.required));
  }

  removeEmail(i: number) {
    const email = this.clienteForm.controls.emails as FormArray;
    email.removeAt(i);
  }

  removeTelefone(i: number) {
    const telefone = this.clienteForm.controls.telefones as FormArray;
    telefone.removeAt(i);
  }

  private loadCliente() {
    if (this.currentAction === 'edit') {
      this.route.paramMap
        .pipe(
          switchMap((parms) =>
            this.clienteService.getById(Number(parms.get('id')))
          )
        )
        .subscribe(
          (data) => {
            this.cliente = data;
            if (this.cliente.emails.length <= 0) {
              this.addEmail('');
            }
            if (this.cliente.telefones.length <= 0) {
              this.addTelefone('');
            }
            this.clienteForm.patchValue(this.cliente);
            this.cliente.emails.forEach((x) => this.addEmail(x));
            this.cliente.telefones.forEach((x) => this.addTelefone(x));
          },
          (err) => {
            if (err.status === 403) {
              toastr.error('Acesso Negado', 'Erro ' + err.status);
            } else {
              toastr.error(err.error.message, 'Erro ' + err.status);
            }
          }
        );
    } else {
      this.addEmail('');
      this.addTelefone('');
    }
  }

  private setPageTitle() {
    if (this.currentAction === 'new') {
      this.pageTitle = 'Cadastro de Novo Cliente';
    } else {
      const clienteName = this.cliente.nome || '';
      this.pageTitle = 'Editando cliente: ' + clienteName;
    }
  }

  private createCliente() {
    const cliente: Cliente = Object.assign(
      new Cliente(),
      this.clienteForm.value
    );

    this.clienteService.create(cliente).subscribe(
      (cliente) => this.actionForSuccess(cliente),
      (err) => this.actionForError(err)
    );
  }

  private updateCliente() {
    const cliente: Cliente = Object.assign(
      new Cliente(),
      this.clienteForm.value
    );

    this.clienteService.update(cliente).subscribe(
      (cliente) => this.actionForSuccess(cliente),
      (err) => {
        if (err.status === 403) {
          toastr.error('Acesso Negado', 'Erro ' + err.status);
        } else {
          toastr.error(err.error.message, 'Erro ' + err.status);
        }
      }
    );
  }

  private actionForSuccess(cliente: Cliente) {
    toastr.success('Solicitação processada com sucesso!');

    this.router
      .navigateByUrl('clientes', { skipLocationChange: true })
      .then(() => this.router.navigate(['clientes', cliente.id, 'edit']));
  }

  private actionForError(err) {
    this.submittingForm = false;

    if (err.status === 403) {
      toastr.error(err.error.message, 'Erro ' + err.status);
    } else if (err.status === 422) {
      toastr.error(err.error.message, 'Erro ' + err.status);
      this.serverErrorMessages = JSON.parse(err._body).erros;
    } else {
      toastr.error('Ocorreu um erro ao processar a sua solicitação!');
      this.serverErrorMessages = [
        'Falha na comunicação com o servidor. Favor tente mais tarde!',
      ];
    }
  }

  private loadEnderecoBuscaCep() {
    let cliente: Cliente = {} as Cliente;
    this.preencheEndereco();
    cliente.enderecos = [this.endereco];
    this.clienteForm.patchValue(cliente);
  }

  private preencheEndereco(): void {
    this.endereco.cep = this.enderecoCapturadoPorCep.cep;
    this.endereco.bairro = this.enderecoCapturadoPorCep.bairro;
    this.endereco.cidade = this.enderecoCapturadoPorCep.localidade;
    this.endereco.estado = this.enderecoCapturadoPorCep.uf;
    this.endereco.logradouro = this.enderecoCapturadoPorCep.logradouro;
  }
}
