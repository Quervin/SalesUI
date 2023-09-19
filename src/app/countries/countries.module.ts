import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesRoutingModule } from './countries-routing.module';

import { SharedModule } from '../shared/shared.module';

import { AddPageComponent } from './pages/add-page/add-page.component';
import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';


@NgModule({
  declarations: [
    AddPageComponent,
    DetailsPageComponent,
    LayoutPageComponent,
    ListPageComponent,
  ],
  imports: [
    CommonModule,
    CountriesRoutingModule,
    SharedModule
  ]
})
export class CountriesModule { }
