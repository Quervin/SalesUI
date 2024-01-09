import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'category',
    canActivate: [ AuthGuard ],
    loadChildren: () => import('./categories/categories.module').then( m => m.CategoriesModule)
  },
  {
    path: 'country',
    canActivate: [ AuthGuard ],
    loadChildren: () => import('./countries/countries.module').then( m => m.CountriesModule)
  },
  {
    path: 'city',
    canActivate: [ AuthGuard ],
    loadChildren: () => import('./cities/cities.module').then( m => m.CitiesModule)
  },
  {
    path: 'state',
    canActivate: [ AuthGuard ],
    loadChildren: () => import('./states/states.module').then( m => m.StatesModule)
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
