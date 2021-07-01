import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Response } from '@core/models/response';
import { Profissional } from './models/profissional';

@Injectable({
  providedIn: 'root',
})
export class ProfissionaisService {
  baseURL = `${environment.baseUrl}/profissionais`;

  constructor(private http: HttpClient) {}

  readAllProfissionais(): Observable<Profissional[]> {
    return this.http.get<Response<Profissional>>(`${this.baseURL}`).pipe(map((res) => res.data));
  }

  createProfissional(profissional: Profissional): Observable<Profissional> {
    return this.http.post<Profissional>(`${this.baseURL}`, profissional);
  }
}
