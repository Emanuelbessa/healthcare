import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { NgxMaskModule } from 'ngx-mask';
import { PacienteListComponent } from './list/paciente-list.component';
import { PacienteCreateComponent } from './create/paciente-create.component';

@NgModule({
  declarations: [PacienteListComponent, PacienteCreateComponent],
  imports: [
    CommonModule,
    NgxBootstrapIconsModule,
    NgSelectModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxMaskModule.forRoot(),
  ],
})
export class PacientesModule { }
