import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { GifResponse } from '../interfaces/gif-response.interfaces';
import { GifMapper } from '../mappers/gif-mapper';
import { Gif } from '../interfaces/gif.interfaces';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GifService {
  private httpClinet = inject(HttpClient);
  private urlBase = environment.urlBaseGiphy;
  private apiKey = environment.apiKeyGiphy;

  public trendigGifs = signal<Gif[]>([]);
  public loading = signal(true);

  constructor() {
    this.loadTrendingGifs();
  }

  loadTrendingGifs() {
    const endpoint: string = `${this.urlBase}/gifs/trending`;
    this.httpClinet
      .get<GifResponse>(endpoint, {
        params: {
          api_key: this.apiKey,
          limit: 20,
        },
      })
      .subscribe((resp: GifResponse) => {
        const gifs = GifMapper.mapGifStructureArrayToGifArray(resp.data);

        this.trendigGifs.set(gifs);

        this.loading.update((item) => (item = false));

        console.log(this.trendigGifs());
      });
  }

  serchGifs(query: string) {
    const endpoint: string = `${this.urlBase}/gifs/search`;
    this.httpClinet
      .get<GifResponse>(endpoint, {
        params: {
          api_key: this.apiKey,
          limit: 20,
          q: query,
        },
      }).pipe(

      )

  }
}
