import { Component, OnInit } from '@angular/core';
import {SearchPlaceService} from '../search-place/search-place.service';
import {CostumeModelComponent} from '../costume-list/costume-model/costume-model.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  costumeModels: CostumeModelComponent[] = [];

  constructor(private searchFormService: SearchPlaceService) {
  }

  ngOnInit() {
    this.costumeModels = this.searchFormService.costumeModels;
    this.searchFormService.costumeModelsChanged.subscribe(
      (costumeModels: CostumeModelComponent[]) => {
        this.costumeModels = costumeModels;
      });
  }

}
