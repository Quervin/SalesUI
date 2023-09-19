import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { MaterialModule } from '../material/material.module';

import { FormComponent } from './components/form/form.component';
import { ListTableComponent } from './components/list-table/list-table.component';
import { LoadingComponent } from './components/loading/loading.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';


@NgModule({
  declarations: [
    FormComponent,
    ListTableComponent,
    LoadingComponent,
    SideNavComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MaterialModule,
    RouterModule,
  ],
  exports: [
    FormComponent,
    ListTableComponent,
    LoadingComponent,
    SideNavComponent,
    MaterialModule
  ]
})
export class SharedModule { }
