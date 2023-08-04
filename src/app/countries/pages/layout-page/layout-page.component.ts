import { Component } from '@angular/core';
import { Menu } from 'src/app/interfaces/menu';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent {

  public sidebarItems: Menu[] = [
    { label: 'Listado', icon: 'label', url: './list'},
    { label: 'Agregar', icon: 'add', url: './add'},
    // { label: 'Editar', icon: 'edit', url: './edit'}
  ]

}
