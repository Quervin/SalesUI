import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatesRoutingModule } from './states-routing.module';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { AddPageComponent } from './pages/add-page/add-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';


@NgModule({
  declarations: [
    DetailsPageComponent,
    AddPageComponent,
    LayoutPageComponent
  ],
  imports: [
    CommonModule,
    StatesRoutingModule,
    MaterialModule,
    SharedModule,
  ]
})
export class StatesModule { }
