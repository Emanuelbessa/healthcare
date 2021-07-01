import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { DataTablesModule } from 'angular-datatables';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { RouterModule } from '@angular/router';
import { NgxCurrencyModule } from 'ngx-currency';
import { AtendimentoListComponent } from './list/atendimento-list.component';
import { AtendimentoCreateComponent } from './create/atendimento-create.component';
import { AtendimentoShowComponent } from './show/atendimento-show.component';

@NgModule({
  declarations: [AtendimentoListComponent, AtendimentoCreateComponent, AtendimentoShowComponent],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    RouterModule,
    NgxCurrencyModule,
    NgxMaskModule.forRoot(),
    NgxBootstrapIconsModule,
  ],
})
export class AtendimentoModule {}
