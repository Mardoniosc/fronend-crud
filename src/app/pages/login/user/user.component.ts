import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/shared/services/storage.service';
import toastr from 'toastr';
import { Login } from '../shared/login.model';
import { LoginService } from '../shared/login.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private storangeService: StorageService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.gerarForm();
  }

  gerarForm() {
    this.form = this.fb.group({
      email: [null, Validators.required],
      senha: [null, Validators.required],
    });
  }

  logar() {
    if (this.form.invalid) {
      toastr.error('Dados inválidos!');
      return;
    }
    const login: Login = this.form.value;

    this.loginService.logar(login).subscribe(
      (data) => {
        toastr.success('Usuário logado com sucesso');
        let token = this.storangeService.getLocalToken();
        const dadosUser = JSON.parse(atob(token.split('.')[1]));
        this.storangeService.setLocalUser(dadosUser);
        this.router.navigate(['/']);
      },
      (err) => {
        toastr.error('Usuário/Senha incorreto!');
        this.storangeService.setLocalUser(null);
        this.storangeService.setLocalToken(null);
      }
    );
  }
}
