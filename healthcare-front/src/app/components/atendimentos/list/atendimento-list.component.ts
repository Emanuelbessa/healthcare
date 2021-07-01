import {
  Component, OnDestroy, OnInit,
} from '@angular/core';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { Atendimento } from 'src/app/components/atendimentos/models/atendimento';
import { AtendimentoService } from 'src/app/components/atendimentos/atendimentos.service';
import { Router } from '@angular/router';
import { IconNamesEnum } from 'ngx-bootstrap-icons';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-atendimento-list',
  templateUrl: './atendimento-list.component.html',
  styleUrls: ['./atendimento-list.component.scss'],
})
export class AtendimentoListComponent implements OnInit, OnDestroy {
  iconNames = IconNamesEnum;

  atendimentos: Atendimento[] = [];

  dtOptions: DataTables.Settings = {};

  dtTrigger = new Subject();

  constructor(
    private atendimentoService: AtendimentoService,
    private router: Router,
  ) {
    this.atendimentoService.readAllAtendimentos().subscribe(
      (atendimentos) => {
        this.atendimentos = atendimentos;
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
}
