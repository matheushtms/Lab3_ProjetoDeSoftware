import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class Login {
  perfil = 'aluno';
  email = '';
  senha = '';

  constructor(private router: Router) {}

  entrar(): void {
    console.log('clicou', this.perfil);

    if (this.perfil === 'aluno') {
      this.router.navigate(['/aluno/dashboard']);
      return;
    }

    if (this.perfil === 'professor') {
      this.router.navigate(['/professor/dashboard']);
      return;
    }

    this.router.navigate(['/parceiro/dashboard']);
  }
}