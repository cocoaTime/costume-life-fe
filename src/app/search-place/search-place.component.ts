import {Component, OnInit} from '@angular/core';
import {SearchFormComponent} from './search-form.component';
import {SearchPlaceService} from './search-place.service';

@Component({
  selector: 'app-search-place',
  templateUrl: './search-place.component.html',
  styleUrls: ['./search-place.component.css']
})
export class SearchPlaceComponent implements OnInit {
  searchForm: SearchFormComponent;

  constructor(private searchFormService: SearchPlaceService) {
  }

  ngOnInit() {
    this.searchForm = new SearchFormComponent(null, null, 'L', 'Мужской');
  }

  onSubmit() {
    this.searchFormService.setSearchForm(this.searchForm);
  }
}
