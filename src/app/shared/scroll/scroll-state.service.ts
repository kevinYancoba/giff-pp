import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollStateService {
  // scrollState = signal(0);

  //TODO: podrimos crear una lista de scrolls de toda la app por medio de Record

  scrollStateApplication: Record<string, number> = {
    scrollTrendingPage: 0,
    scrooSerachGiff: 520,
  };

  saveStatePage(namePage: string, state: number) {
    this.scrollStateApplication[namePage] = state;
  }

  getStatePage(namePage: string): number {
    return this.scrollStateApplication[namePage];
  }
}
