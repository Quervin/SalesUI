import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { AddPageComponent } from './pages/add-page/add-page.component';
import { ChildAuthGuard } from '../auth/guards';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    canActivateChild: [ ChildAuthGuard ],
    children: [
      { path: 'add/:id', component: AddPageComponent },
      { path: 'edit/:id', component: AddPageComponent },
      { path: '**', redirectTo: 'add' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitiesRoutingModule { }
