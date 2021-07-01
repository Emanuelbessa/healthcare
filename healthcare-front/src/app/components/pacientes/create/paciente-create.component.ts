import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Paciente } from '../models/paciente';
import { PacientesService } from '../pacientes.service';

@Component({
  templateUrl: './paciente-create.component.html',
  styleUrls: ['./paciente-create.component.scss'],
})
export class PacienteCreateComponent implements OnInit {
  createPacienteForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private pacientesService: PacientesService,
  ) { }

  ngOnInit(): void {
    this.createPacienteForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      nome: ['', Validators.required],
      telefone: ['', [Validators.required]],
    });
  }

  submitPaciente(): void {
    if (this.createPacienteForm.valid) {
      Swal.showLoading();
      const paciente: Paciente = {
        nome_paciente: this.createPacienteForm.controls.nome.value,
        email_paciente: this.createPacienteForm.controls.email.value,
        telefone_paciente: this.createPacienteForm.controls.telefone.value,
      };
      this.pacientesService.createPaciente(paciente).subscribe(
        () => {
          Swal.close();
          Swal.fire({
            allowOutsideClick: true,
            title: 'Sucesso!',
            text: 'Paciente cadastrado com sucesso!',
            confirmButtonText: 'Ok',
            icon: 'success',
            showCloseButton: true,
            timer: 3000,
          });
          this.router.navigate(['/pacientes']);
        },
        (err: HttpErrorResponse) => {
          Swal.close();
          Swal.fire('Erro!', err.error.error, 'error');
        },
      );
    }
  }
}
