import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SideNavComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    SideNavComponent,
    LoadingComponent
  ]
})
export class SharedModule { }
