import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitiesRoutingModule } from './cities-routing.module';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module'; 

import { AddPageComponent } from './pages/add-page/add-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';


@NgModule({
  declarations: [
    LayoutPageComponent,
    AddPageComponent
  ],
  imports: [
    CommonModule,
    CitiesRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class CitiesModule { }
