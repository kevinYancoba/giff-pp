import { Gif } from './../interfaces/gif.interfaces';
import { HttpClient } from '@angular/common/http';
import {
  computed,
  effect,
  inject,
  Injectable,
  signal,
  WritableSignal,
} from '@angular/core';
import { environment } from '@environments/environment';
import { GifResponse } from '../interfaces/gif-response.interfaces';
import { GifMapper } from '../mappers/gif-mapper';
import { map, tap } from 'rxjs';

const getGifsLocalStorage = () => {
  const gifs = localStorage.getItem('gifs') ?? '{}';
  return JSON.parse(gifs);
};

@Injectable({
  providedIn: 'root',
})
export class GifService {
  private httpClinet = inject(HttpClient);
  private urlBase = environment.urlBaseGiphy;
  private apiKey = environment.apiKeyGiphy;

  public trendigGifs = signal<Gif[]>([]);
  public searchGifs = signal<Gif[]>([]);
  public loading = signal(false);
  private pageGiff = signal(0);

  public masonryTrendingGifs = computed<Array<Gif[]>>(() => {
    const arrayGroup = [];
    for (let index = 0; index < this.trendigGifs().length; index = index + 3) {
      const group = this.trendigGifs().slice(index, index + 3);

      arrayGroup.push(group);
    }

    console.log(arrayGroup);
    return arrayGroup;
  });

  public searchHistory = signal<Record<string, Gif[]>>(getGifsLocalStorage());

  public searchHistoryComputed = computed(() =>
    Object.keys(this.searchHistory()),
  );

  saveToLocalStorage = effect(() => {
    localStorage.setItem('gifs', JSON.stringify(this.searchHistory()));
  });

  constructor() {
    this.loadTrendingGifs();
  }

  loadTrendingGifs() {
    console.log('lanza peticion');
    if (this.loading()) return;
    console.log('lanza peticion y es haceptada');

    this.loading.set(true);

    const endpoint: string = `${this.urlBase}/gifs/trending`;
    this.httpClinet
      .get<GifResponse>(endpoint, {
        params: {
          api_key: this.apiKey,
          limit: 20,
          offset: this.pageGiff() * 20,
        },
      })
      .subscribe((resp: GifResponse) => {
        const gifs = GifMapper.mapGifStructureArrayToGifArray(resp.data);

        console.log(gifs);

        this.trendigGifs.update((curremtGiff) => [...curremtGiff, ...gifs]);
        this.pageGiff.update((currentPage) => currentPage+1);
        this.loading.set(false);
      });
  }

  loadSerchGifs(query: string) {
    const endpoint: string = `${this.urlBase}/gifs/search`;
    return this.httpClinet
      .get<GifResponse>(endpoint, {
        params: {
          api_key: this.apiKey,
          limit: 20,
          q: query,
        },
      })
      .pipe(
        map((resp) => GifMapper.mapGifStructureArrayToGifArray(resp.data)),
        tap((gifs) => {
          this.searchHistory.update((history) => ({
            ...history,
            [query.toLowerCase()]: gifs,
          }));

          console.log(gifs);
        }),
      );
  }

  searchBykey(query: string): Array<Gif> {
    return this.searchHistory()[query];
  }
}
