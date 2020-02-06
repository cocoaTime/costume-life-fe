import { Component } from '@angular/core';
import {SearchFormComponent} from './search-place/search-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  searchForm: SearchFormComponent;
  pageToLoad = 'main';

  onNavigate(page: string) {
    this.pageToLoad = page;
  }
}
