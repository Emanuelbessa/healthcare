import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { NgxMaskModule } from 'ngx-mask';
import { RouterModule } from '@angular/router';
import { ProfissionalListComponent } from './list/profissional-list.component';
import { ProfissionalCreateComponent } from './create/profissional-create.component';

@NgModule({
  declarations: [ProfissionalListComponent, ProfissionalCreateComponent],
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
export class ProfissionaisModule { }
