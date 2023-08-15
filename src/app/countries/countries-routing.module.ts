import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { AddPageComponent } from './pages/add-page/add-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'list', component: ListPageComponent },
      { path: 'add', component: AddPageComponent },
      { path: 'edit/:id', component: AddPageComponent },
      { path: '**', redirectTo: 'list' }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CountriesRoutingModule { }
