import {Component} from '@angular/core';
import {SearchFormComponent} from './search-form.component';
import {SearchPlaceService} from './search-place.service';

@Component({
  selector: 'app-search-place',
  templateUrl: './search-place.component.html',
  styleUrls: ['./search-place.component.css']
})
export class SearchPlaceComponent {
  searchForm: SearchFormComponent = new SearchFormComponent(null, null, 'L', 'Мужской');

  constructor(private searchFormService: SearchPlaceService) {
  }

  onSubmit() {
    this.searchFormService.setSearchForm(this.searchForm);
  }
}
