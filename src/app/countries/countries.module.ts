import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CountriesRoutingModule } from './countries-routing.module';
import { MaterialModule } from '../material/material.module';

import { AddPageComponent } from './pages/add-page/add-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AddPageComponent,
    LayoutPageComponent,
    ListPageComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CountriesRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class CountriesModule { }
