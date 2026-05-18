import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aluno } from '../models/aluno.model';

@Injectable({
  providedIn: 'root',
})
export class AlunoService {
  private readonly apiUrl = '/api/alunos';

  constructor(private http: HttpClient) {}

  /**
   * Obtém a lista de todos os alunos cadastrados.
   */
  listar(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(this.apiUrl);
  }

  /**
   * Obtém um aluno específico pelo ID.
   */
  buscarPorId(id: number): Observable<Aluno> {
    return this.http.get<Aluno>(`${this.apiUrl}/${id}`);
  }

  /**
   * Cadastra um novo aluno no sistema.
   */
  criar(aluno: Aluno): Observable<Aluno> {
    return this.http.post<Aluno>(this.apiUrl, aluno);
  }

  /**
   * Atualiza um aluno existente.
   */
  atualizar(id: number, aluno: Aluno): Observable<Aluno> {
    return this.http.put<Aluno>(`${this.apiUrl}/${id}`, aluno);
  }

  /**
   * Deleta um aluno.
   */
  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}