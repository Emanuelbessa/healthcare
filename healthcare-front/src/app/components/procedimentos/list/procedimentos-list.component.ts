import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IconNamesEnum } from 'ngx-bootstrap-icons';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { Procedimento } from '../models/procedimento';
import { ProcedimentosService } from '../procedimentos.service';

@Component({
  templateUrl: './procedimentos-list.component.html',
  styleUrls: ['./procedimentos-list.component.scss'],
})
export class ProcedimentosListComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};

  dtTrigger = new Subject();

  procedimentos: Procedimento[] = [];

  iconNames = IconNamesEnum;

  constructor(
    private procedimentoService: ProcedimentosService,
    private router: Router,
  ) {
    this.procedimentoService.readAllProcedimentos().subscribe(
      (procedimentos) => {
        this.procedimentos = procedimentos;
        this.dtTrigger.next();
      },
      (err: HttpErrorResponse) => {
        Swal.fire({
          allowOutsideClick: true,
          title: 'Erro!',
          text: `Erro ao listar procedimentos, ${err.error.error}`,
          confirmButtonText: 'Ok',
          icon: 'error',
          showCloseButton: true,
        });
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
