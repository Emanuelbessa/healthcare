import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Response } from '@core/models/response';
import { Atendimento } from './models/atendimento';
import { AtendimentoDTO } from './models/atendimentoDTO';

@Injectable({
  providedIn: 'root',
})
export class AtendimentoService {
  baseURL = `${environment.baseUrl}/atendimentos`;

  constructor(private http: HttpClient) {}

  readAllAtendimentos(): Observable<Atendimento[]> {
    return this.http.get<Response<Atendimento>>(`${this.baseURL}`).pipe(map((res) => res.data));
  }

  createAtendimento(paciente: Atendimento): Observable<Atendimento> {
    return this.http.post<Atendimento>(`${this.baseURL}`, paciente);
  }

  readAtendimentoProced(AtendimentoProcedimentoId?: number): Observable<AtendimentoDTO[]> {
    return this.http.get<Response<AtendimentoDTO>>(`${this.baseURL}/procedimentos/${AtendimentoProcedimentoId}`).pipe(map((res) => res.data));
  }

  updateStatusAtend(atendProcIds: Number[]): Observable<Atendimento> {
    return this.http.post<Atendimento>(`${this.baseURL}/update/status`, atendProcIds);
  }
}
