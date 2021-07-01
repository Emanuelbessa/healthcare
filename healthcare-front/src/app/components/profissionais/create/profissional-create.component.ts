import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Profissional } from '../models/profissional';
import { ProfissionaisService } from '../profissionais.service';

@Component({
  templateUrl: './profissional-create.component.html',
  styleUrls: ['./profissional-create.component.scss'],
})
export class ProfissionalCreateComponent implements OnInit {
  createProfissionalForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private profissionaisService: ProfissionaisService,
  ) { }

  ngOnInit(): void {
    this.createProfissionalForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      nome: ['', Validators.required],
      telefone: ['', [Validators.required]],
    });
  }

  submitProfissional(): void {
    if (this.createProfissionalForm.valid) {
      Swal.showLoading();
      const profissional: Profissional = {
        nome_profissional: this.createProfissionalForm.controls.nome.value,
        email_profissional: this.createProfissionalForm.controls.email.value,
        telefone_profissional: this.createProfissionalForm.controls.telefone.value,
      };
      this.profissionaisService.createProfissional(profissional).subscribe(
        () => {
          Swal.close();
          Swal.fire({
            allowOutsideClick: true,
            title: 'Sucesso!',
            text: 'Profissional cadastrado com sucesso!',
            confirmButtonText: 'Ok',
            icon: 'success',
            showCloseButton: true,
            timer: 3000,
          });
          this.router.navigate(['/profissionais']);
        },
        (err: HttpErrorResponse) => {
          Swal.close();
          Swal.fire('Erro!', err.error.error, 'error');
        },
      );
    }
  }
}
