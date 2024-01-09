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
import { ImagePipe } from './pipes/image.pipe';


@NgModule({
  declarations: [
    FormComponent,
    ListTableComponent,
    LoadingComponent,
    SideNavComponent,
    ImagePipe,
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
    ReactiveFormsModule,
    ListTableComponent,
    LoadingComponent,
    SideNavComponent,
    MaterialModule,
    ImagePipe
  ]
})
export class SharedModule { }
