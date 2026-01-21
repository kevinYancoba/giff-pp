import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { GifService } from '../../services/gif-services.service';
import { GifListComponent } from '../../components/gif-list/gif-list.component';

@Component({
  selector: 'app-history-gifs',
 imports: [GifListComponent],
  templateUrl: './history-gifs.component.html',
  styleUrl: './history-gifs.component.css',
})
export default class HistoryGifsComponent {
  public gifsService = inject(GifService);

  query = toSignal(
    inject(ActivatedRoute).params.pipe(map((param) => param['query']))
  );
}
