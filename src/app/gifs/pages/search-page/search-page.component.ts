import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-search-page',
  imports: [],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export default class SearchPageComponent {


  onSearch(query: string) {
    console.log(query);
  }
}
