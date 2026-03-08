import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { GifService } from '../../services/gif-services.service';
import { ScrollStateService } from 'src/app/shared/scroll/scroll-state.service';

@Component({
  selector: 'app-treading-page',
  // imports: [GifListComponent],
  templateUrl: './trending-page.component.html',
  styleUrl: './treading-page.component.css',
})
export default class TreadingPageComponent implements AfterViewInit {
  gifService = inject(GifService);
  scrollStateService = inject(ScrollStateService);

  SCROLL_TREANDING_PAGE = 'scrollTrendingPage';

  scrollDivReff = viewChild<ElementRef<HTMLDivElement>>('scrollDiv');

  ngAfterViewInit(): void {
    const scrollRef = this.scrollDivReff()?.nativeElement;
    if (!scrollRef) return;

    scrollRef.scrollTop = this.scrollStateService.getStatePage(
      this.SCROLL_TREANDING_PAGE,
    );
  }

  onScroll(event: Event) {
    const scrollRef = this.scrollDivReff()?.nativeElement;

    if (!scrollRef) return;

    const scrollTop = scrollRef.scrollTop;
    const clientHigth = scrollRef.clientHeight;
    const scrollHeigth = scrollRef.scrollHeight;

    const isAttBotton = scrollTop + clientHigth + 300 >= scrollHeigth;

    this.scrollStateService.saveStatePage(
      this.SCROLL_TREANDING_PAGE,
      scrollTop,
    );

    if (isAttBotton) {
      this.gifService.loadTrendingGifs();
    }
  }
}
