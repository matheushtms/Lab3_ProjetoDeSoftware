import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { AlunoDashboard } from './pages/aluno-dashboard/aluno-dashboard';
import { ProfessorDashboard } from './pages/professor-dashboard/professor-dashboard';
import { ParceiroDashboard } from './pages/parceiro-dashboard/parceiro-dashboard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'aluno/dashboard', component: AlunoDashboard },
  { path: 'professor/dashboard', component: ProfessorDashboard },
  { path: 'parceiro/dashboard', component: ParceiroDashboard },
  { path: '**', redirectTo: 'login' },
];