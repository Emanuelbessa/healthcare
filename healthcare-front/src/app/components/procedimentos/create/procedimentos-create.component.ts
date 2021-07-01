import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Procedimento } from '../models/procedimento';
import { ProcedimentosService } from '../procedimentos.service';

@Component({
  templateUrl: './procedimentos-create.component.html',
  styleUrls: ['./procedimentos-create.component.scss'],
})
export class ProcedimentosCreateComponent implements OnInit {
  createProcedimentoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private procedimentoService: ProcedimentosService,
  ) { }

  ngOnInit(): void {
    this.createProcedimentoForm = this.fb.group({
      nome: ['', Validators.required],
      valor: ['', Validators.required],
      comissao: ['', Validators.required],
    });
  }

  submitProcedimento(): void {
    if (this.createProcedimentoForm.valid) {
      Swal.showLoading();
      const procedimento: Procedimento = {
        nome_procedimento: this.createProcedimentoForm.controls.nome.value,
        valor_procedimento: this.createProcedimentoForm.controls.valor.value,
        percentual_comissao: this.createProcedimentoForm.controls.comissao.value,
      };
      this.procedimentoService.createProcedimento(procedimento).subscribe(
        () => {
          Swal.close();
          Swal.fire({
            allowOutsideClick: true,
            title: 'Sucesso!',
            text: 'Procedimento cadastrado com sucesso!',
            confirmButtonText: 'Ok',
            icon: 'success',
            showCloseButton: true,
            timer: 3000,
          });
          this.router.navigate(['/procedimentos']);
        },
        (err: HttpErrorResponse) => {
          Swal.close();
          Swal.fire('Erro!', err.error.error, 'error');
        },
      );
    }
  }
}
