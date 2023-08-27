import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'country',
    loadChildren: () => import('./countries/countries.module').then( m => m.CountriesModule)
  },
  {
    path: 'state',
    loadChildren: () => import('./states/states.module').then( m => m.StatesModule)
  },
  {
    path: 'city',
    loadChildren: () => import('./cities/cities.module').then( m => m.CitiesModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
