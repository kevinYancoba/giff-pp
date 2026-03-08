import { GifService } from './../../../services/gif-services.service';
import { Component, inject } from '@angular/core';
import { MenuOption } from '../../../interfaces/menu-option.interfaces';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.component.html',
  styleUrl: './side-menu-options.component.css',
})
export class SideMenuOptionsComponent {
  public gifService = inject(GifService);

  menuOptions: MenuOption[] = [
    {
      icon: 'fa-solid fa-chart-simple',
      label: 'trending',
      route: '/dashboard/trending',
      subLabel: 'resumen-de-tendencias',
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'search',
      route: '/dashboard/search',
      subLabel: 'buscar tendencias',
    },
  ];
}
