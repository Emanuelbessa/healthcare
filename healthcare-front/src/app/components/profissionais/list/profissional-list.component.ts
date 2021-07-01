import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IconNamesEnum } from 'ngx-bootstrap-icons';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { Profissional } from '../models/profissional';
import { ProfissionaisService } from '../profissionais.service';

@Component({
  templateUrl: './profissional-list.component.html',
  styleUrls: ['./profissional-list.component.scss'],
})
export class ProfissionalListComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};

  dtTrigger = new Subject();

  profissionais: Profissional[] = [];

  iconNames = IconNamesEnum;

  constructor(
    private profissionalService: ProfissionaisService,
    private router: Router,
  ) {
    this.profissionalService.readAllProfissionais().subscribe(
      (profissionais) => {
        this.profissionais = profissionais;
        this.dtTrigger.next();
      },
      (err: HttpErrorResponse) => {
        Swal.fire({
          allowOutsideClick: true,
          title: 'Erro!',
          text: `Erro ao listar profissionais, ${err.error.error}`,
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
