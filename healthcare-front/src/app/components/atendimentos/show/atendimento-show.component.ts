import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { AtendimentoService } from '../atendimentos.service';
import { AtendimentoProcedimento } from '../models/atendimento-procedimento';
import { AtendimentoDTO } from '../models/atendimentoDTO';

@Component({
  templateUrl: './atendimento-show.component.html',
  styleUrls: ['./atendimento-show.component.scss'],
})
export class AtendimentoShowComponent implements OnInit, OnDestroy {
  atendimentosProcedimentos: AtendimentoDTO[] = [];

  dtOptions: DataTables.Settings = {};

  dtTrigger = new Subject();

  idAtendimentoProcedimento: number;

  atendProcIds: number[] = [];

  concluido: AtendimentoProcedimento;

  constructor(
    private atendimentoService: AtendimentoService,
    private router: Router,
    private activeRoute: ActivatedRoute,
  ) {
    this.idAtendimentoProcedimento = parseInt(this.activeRoute.snapshot.paramMap.get('id'), 10);
    this.atendimentoService.readAtendimentoProced(this.idAtendimentoProcedimento).subscribe(
      (atendProc) => {
        this.atendimentosProcedimentos = atendProc;
        this.atendProcIds = atendProc
          .map((atendimentoProcedimento) => atendimentoProcedimento.id_atend_proc);
        this.dtTrigger.next();
      },
      (err: HttpErrorResponse) => {
        Swal.close();
        Swal.fire('Erro!', err.error.error, 'error');
      },
    );
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      responsive: true,
      order: [0, 'desc'],
      dom: '<lf<Bt>ip>',
      language: {
        search: 'Buscar',
        emptyTable: 'Não existem registros',
        lengthMenu: 'Mostrando _MENU_ registros',
        info: 'Mostrando de _START_ até _END_ de _TOTAL_ registros',
        loadingRecords: 'Carregando registros...',
        zeroRecords: 'Não existem registros',
        infoEmpty: '',
        paginate: {
          first: 'Primeiro',
          last: 'Último',
          next: 'Próximo',
          previous: 'Anterior',
        },
      },
      // searching: false,
    };
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  validarprocedimentos(): void {
    this.concluido = this.atendimentosProcedimentos
      .find((atendProc) => !!atendProc.procedimento_realizado === false);

    if (!this.concluido) {
      Swal.fire('Todos os procedimentos já estão marcados como realizados', '', 'info');
      return;
    }
    Swal.fire({
      title: 'Tem certeza?',
      html:
      `Deseja marcar como realizado os procedimentos do paciente: ${this.atendimentosProcedimentos[0].nome_paciente}?<br>`
      + `O valor total dos atendimentos é de: R$ ${this.atendimentosProcedimentos[0].valor_total_procedimento}<br>`
      + `O valor total das comissões é de: R$ ${this.atendimentosProcedimentos[0].valor_total_comissao}`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.showLoading();
        this.atendimentoService.updateStatusAtend(this.atendProcIds).subscribe(
          () => {
            Swal.close();
            Swal.fire('Sucesso!', 'Procedimentos marcados como realizado!', 'success');
          },
          (err: HttpErrorResponse) => {
            Swal.close();
            Swal.fire('Erro!', err.error.error, 'error');
          },
        );
        this.router.navigate(['/']);
      } else if (result.isDenied) {
        Swal.fire('Procedimentos não atualizados', '', 'info');
      }
    });
  }
}
