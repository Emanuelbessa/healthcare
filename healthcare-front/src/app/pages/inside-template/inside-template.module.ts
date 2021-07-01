import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { AtendimentoModule } from '@components/atendimentos/atendimentos.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfissionaisModule } from '@components/profissionais/profissionais.module';
import { PacientesModule } from '@components/pacientes/pacientes.module';
import { ProcedimentosModule } from '@components/procedimentos/procedimentos.module';
import { InsideTemplateRoutingModule } from './inside-template-routing.module';
import { InsideTemplateComponent } from './inside-template.component';

@NgModule({
  declarations: [
    InsideTemplateComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    InsideTemplateRoutingModule,
    SharedModule,
    DataTablesModule,
    AtendimentoModule,
    FontAwesomeModule,
    ProfissionaisModule,
    PacientesModule,
    ProcedimentosModule,
  ],
})
export class InsideTemplateModule { }
