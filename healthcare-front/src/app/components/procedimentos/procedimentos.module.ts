import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { NgxCurrencyModule } from 'ngx-currency';
import { NgxMaskModule } from 'ngx-mask';
import { ProcedimentosListComponent } from './list/procedimentos-list.component';
import { ProcedimentosCreateComponent } from './create/procedimentos-create.component';

@NgModule({
  declarations: [ProcedimentosListComponent, ProcedimentosCreateComponent],
  imports: [
    CommonModule,
    NgxBootstrapIconsModule,
    NgSelectModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxCurrencyModule,
    NgxMaskModule.forRoot(),
  ],
})
export class ProcedimentosModule { }
