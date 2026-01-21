import { Component, inject, signal } from '@angular/core';
import { GifListComponent } from '../../components/gif-list/gif-list.component';
import { GifService } from '../../services/gif-services.service';

@Component({
  selector: 'app-treading-page',
  // imports: [GifListComponent],
  templateUrl: './trending-page.component.html',
  styleUrl: './treading-page.component.css',
})
export default class TreadingPageComponent {
  gifService = inject(GifService);
}
