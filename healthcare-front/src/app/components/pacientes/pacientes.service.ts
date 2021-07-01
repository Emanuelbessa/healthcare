import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Response } from '@core/models/response';
import { Paciente } from './models/paciente';

@Injectable({
  providedIn: 'root',
})
export class PacientesService {
  baseURL = `${environment.baseUrl}/pacientes`;

  constructor(private http: HttpClient) {}

  readAllPacientes(): Observable<Paciente[]> {
    return this.http.get<Response<Paciente>>(`${this.baseURL}`).pipe(map((res) => res.data));
  }

  createPaciente(paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(`${this.baseURL}`, paciente);
  }
}
