import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Response } from '@core/models/response';
import { Procedimento } from './models/procedimento';

@Injectable({
  providedIn: 'root',
})
export class ProcedimentosService {
  baseURL = `${environment.baseUrl}/procedimentos`;

  constructor(private http: HttpClient) {}

  readAllProcedimentos(): Observable<Procedimento[]> {
    return this.http.get<Response<Procedimento>>(`${this.baseURL}`).pipe(map((res) => res.data));
  }

  createProcedimento(procedimento: Procedimento): Observable<Procedimento> {
    return this.http.post<Procedimento>(`${this.baseURL}`, procedimento);
  }
}
