import { Component } from '@angular/core';

import { Menu } from 'src/app/interfaces';

import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'shared-side-nav',
  templateUrl: './side-nav.component.html',
  styles: [
  ]
})
export class SideNavComponent {

  get authenticate() {
    return this.authService.chechAuthentication;
  }

  public sidebarItems: Menu[] = [];

  constructor(private authService: AuthService,) {
    if (this.authenticate) {
      this.sidebarItems = [
        { label: 'Listado de Paises', icon: 'label', url: ['/country/list'] },
        { label: 'Listado de Categorias', icon: 'apps', url: ['/category/list'] }
      ]
    } else {
      this.sidebarItems = [
        { label: 'Login', icon: 'edit', url: ['/auth/login'] }
      ]
    }
  }

  logout() {
    this.authService.logout();
  }
}
