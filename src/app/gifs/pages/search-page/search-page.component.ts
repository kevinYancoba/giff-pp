import { Component, effect, inject, signal } from '@angular/core';
import { GifService } from '../../services/gif-services.service';
import { GifListComponent } from '../../components/gif-list/gif-list.component';
import { Gif } from '../../interfaces/gif.interfaces';

@Component({
  selector: 'app-search-page',
  imports: [GifListComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css',
})
export default class SearchPageComponent {
  public gifService = inject(GifService);

  public gifs = signal<Gif[]>([]);

  onSearch(query: string) {
    this.gifService.loadSerchGifs(query)
    .subscribe((resp) => this.gifs.set(resp));
  }
}
