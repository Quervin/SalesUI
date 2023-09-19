import { Component } from '@angular/core';

import { Menu } from 'src/app/interfaces';

@Component({
  selector: 'shared-side-nav',
  templateUrl: './side-nav.component.html',
  styles: [
  ]
})
export class SideNavComponent {
  public sidebarItems: Menu[] = [
    { label: 'Listado de Paises', icon: 'label', url: ['/country/list']},
    { label: 'Listado de Categorias', icon: 'apps', url: ['/category/list']},
     { label: 'Login', icon: 'edit', url: ['/auth/login']}
  ]
}
