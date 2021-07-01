import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtendimentoCreateComponent } from '@components/atendimentos/create/atendimento-create.component';
import { AtendimentoShowComponent } from '@components/atendimentos/show/atendimento-show.component';
import { PacienteCreateComponent } from '@components/pacientes/create/paciente-create.component';
import { PacienteListComponent } from '@components/pacientes/list/paciente-list.component';
import { ProcedimentosCreateComponent } from '@components/procedimentos/create/procedimentos-create.component';
import { ProcedimentosListComponent } from '@components/procedimentos/list/procedimentos-list.component';
import { ProfissionalCreateComponent } from '@components/profissionais/create/profissional-create.component';
import { ProfissionalListComponent } from '@components/profissionais/list/profissional-list.component';
import { AtendimentoListComponent } from 'src/app/components/atendimentos/list/atendimento-list.component';
import { InsideTemplateComponent } from './inside-template.component';

const routes: Routes = [{
  path: '',
  component: InsideTemplateComponent,
  children: [
    {
      path: '',
      component: AtendimentoListComponent,
      data: {
        title: 'Página de Listagem dos Atendimentos',
      },
    },
    {
      path: 'atendimentos/create',
      component: AtendimentoCreateComponent,
      data: {
        title: 'Página de Criação dos Atendimentos',
      },
    },
    {
      path: 'atendimentos/:id',
      component: AtendimentoShowComponent,
      data: {
        title: 'Página de Detalhe do Atendimento',
      },
    },
    {
      path: 'profissionais',
      component: ProfissionalListComponent,
      data: {
        title: 'Página de Listagem dos Profissionais',
      },
    },
    {
      path: 'profissionais/create',
      component: ProfissionalCreateComponent,
      data: {
        title: 'Página de Criação dos Profissionais',
      },
    },
    {
      path: 'pacientes',
      component: PacienteListComponent,
      data: {
        title: 'Página de Listagem dos Pacientes',
      },
    },
    {
      path: 'pacientes/create',
      component: PacienteCreateComponent,
      data: {
        title: 'Página de Criação dos Pacientes',
      },
    },
    {
      path: 'procedimentos',
      component: ProcedimentosListComponent,
      data: {
        title: 'Página de Listagem dos Procedimentos',
      },
    },
    {
      path: 'procedimentos/create',
      component: ProcedimentosCreateComponent,
      data: {
        title: 'Página de Criação dos Procedimentos',
      },
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsideTemplateRoutingModule { }
