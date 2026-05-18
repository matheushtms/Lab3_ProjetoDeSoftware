import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

type Perfil = 'aluno' | 'professor' | 'parceiro';

interface Conta {
  nome: string;
  email: string;
  cpf: string;
  rg: string;
  endereco: string;
  curso: string;
  senha: string;
  perfil: Perfil;
  instituicaoId: number;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class Login implements OnInit {
  aba: 'cadastro' | 'login' = 'cadastro';

  loginPerfil: Perfil = 'aluno';
  loginEmail = '';
  loginSenha = '';

  cadastro: Conta = this.novoCadastro();

  mensagem = '';
  erro = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  entrar(): void {
    this.mensagem = '';
    this.erro = '';

    if (!this.loginEmail || !this.loginSenha) {
      this.erro = 'Preencha email e senha.';
      return;
    }

    if (this.loginPerfil === 'aluno') {
      this.router.navigate(['/aluno/dashboard']);
      return;
    }

    if (this.loginPerfil === 'professor') {
      this.router.navigate(['/professor/dashboard']);
      return;
    }

    this.router.navigate(['/parceiro/dashboard']);
  }

  salvarCadastro(): void {
    this.mensagem = '';
    this.erro = '';

    const payload = {
      nome: this.cadastro.nome,
      email: this.cadastro.email,
      cpf: this.cadastro.cpf,
      rg: this.cadastro.rg,
      endereco: this.cadastro.endereco,
      curso: this.cadastro.curso,
      senha: this.cadastro.senha,
      instituicaoId: Number(this.cadastro.instituicaoId || 1),
    };

    this.authService.register(payload).subscribe({
      next: () => {
        this.mensagem = 'Cadastro realizado com sucesso. Agora faça login.';
        this.loginEmail = this.cadastro.email;
        this.loginSenha = '';
        this.loginPerfil = this.cadastro.perfil;
        this.aba = 'login';
        this.cadastro = this.novoCadastro();
      },
      error: (err: any) => {
        console.error('Erro ao cadastrar:', err);
        this.erro = err?.error || 'Erro ao cadastrar.';
      },
    });
  }

  private novoCadastro(): Conta {
    return {
      nome: '',
      email: '',
      cpf: '',
      rg: '',
      endereco: '',
      curso: '',
      senha: '',
      perfil: 'aluno',
      instituicaoId: 1,
    };
  }
}