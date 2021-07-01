import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProfissionaisService } from '@components/profissionais/profissionais.service';
import { PacientesService } from '@components/pacientes/pacientes.service';
import { ProcedimentosService } from '@components/procedimentos/procedimentos.service';
import { Profissional } from '@components/profissionais/models/profissional';

import { Procedimento } from '@components/procedimentos/models/procedimento';
import { Paciente } from '@components/pacientes/models/paciente';

import { AtendimentoService } from '../atendimentos.service';
import { Atendimento } from '../models/atendimento';
import { AtendimentoProcedimento } from '../models/atendimento-procedimento';

@Component({
  templateUrl: './atendimento-create.component.html',
  styleUrls: ['./atendimento-create.component.scss'],
})
export class AtendimentoCreateComponent implements OnInit {
  createAtendimentoForm: FormGroup;

  profissionais: Profissional[] = [];

  profissionalSelecionado: Profissional;

  pacientes: Paciente[] = [];

  pacienteSelecionado: Paciente;

  procedimentos: Procedimento[] = [];

  procedimetosSelecionados: Procedimento[] = [];

  totalComissao:number = 0;

  totalProcedimentos:number = 0;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private atendimentoService: AtendimentoService,
    private profissionaisService: ProfissionaisService,
    private pacienteService: PacientesService,
    private procedimentoService: ProcedimentosService,
  ) { }

  ngOnInit(): void {
    this.profissionaisService.readAllProfissionais().subscribe(
      (profissionais) => {
        this.profissionais = profissionais;
      },
      (err: HttpErrorResponse) => {
        Swal.close();
        Swal.fire('Erro!', err.error.error, 'error');
      },
    );
    this.pacienteService.readAllPacientes().subscribe(
      (pacientes) => {
        this.pacientes = pacientes;
      },
      (err: HttpErrorResponse) => {
        Swal.close();
        Swal.fire('Erro!', err.error.error, 'error');
      },
    );
    this.procedimentoService.readAllProcedimentos().subscribe(
      (procedimentos) => {
        this.procedimentos = procedimentos;
      },
      (err: HttpErrorResponse) => {
        Swal.close();
        Swal.fire('Erro!', err.error.error, 'error');
      },
    );
    this.createAtendimentoForm = this.fb.group({
      valorTotal: ['', [Validators.required]],
      comissaoTotal: ['', [Validators.required, Validators.min(1)]],
      telefoneProfissional: ['', [Validators.required]],
    });
  }

  sumValoresPagamento(): void {
    this.totalProcedimentos = this.procedimetosSelecionados
      .reduce((a, b) => a + Number(b.valor_procedimento), 0);
    this.createAtendimentoForm.get('valorTotal').setValue(this.totalProcedimentos);

    this.totalComissao = this.procedimetosSelecionados
      // eslint-disable-next-line no-mixed-operators
      .reduce((a, b) => a + (b.valor_procedimento * b.percentual_comissao / 100), 0);
    this.createAtendimentoForm.get('comissaoTotal').setValue(this.totalComissao);
  }

  setTelefoneProfissional(): void {
    if (this.profissionalSelecionado) {
      this.createAtendimentoForm.get('telefoneProfissional').setValue(this.profissionalSelecionado.telefone_profissional);
    } else {
      this.createAtendimentoForm.get('telefoneProfissional').setValue('');
    }
  }

  submitAtendimento(): void {
    if (this.createAtendimentoForm.valid) {
      Swal.showLoading();
      const procedimentosAtendimentos: AtendimentoProcedimento[] = [];
      this.procedimetosSelecionados.forEach((procedimento) => {
        const atendProcedimento: AtendimentoProcedimento = {
          id_profissional: this.profissionalSelecionado.id_profissional,
          id_procedimento: procedimento.id_procedimento,
          valor_procedimento: procedimento.valor_procedimento,
          // eslint-disable-next-line no-mixed-operators
          valor_comissao: procedimento.percentual_comissao * procedimento.valor_procedimento / 100,
          procedimento_realizado: false,
        };
        procedimentosAtendimentos.push(atendProcedimento);
      });

      const atendimento: Atendimento = {
        id_paciente: this.pacienteSelecionado.id_paciente,
        valor_total_procedimento: this.totalProcedimentos,
        valor_total_comissao: this.totalComissao,
        procedimentos: procedimentosAtendimentos,
      };

      this.atendimentoService.createAtendimento(atendimento).subscribe(
        () => {
          Swal.close();
          Swal.fire({
            allowOutsideClick: true,
            title: 'Sucesso!',
            text: 'Atendimento cadastrado com sucesso!',
            confirmButtonText: 'Ok',
            icon: 'success',
            showCloseButton: true,
            timer: 3000,
          });
          this.router.navigate(['/']);
        },
        (err: HttpErrorResponse) => {
          Swal.close();
          Swal.fire('Erro!', err.error.error, 'error');
        },
      );
    }
  }
}
