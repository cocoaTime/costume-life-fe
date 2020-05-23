import { Component, OnInit } from '@angular/core';
import {CostumeModelService} from '../costume-list/costume-model.service';
import {CostumeModelComponent} from '../costume-list/costume-model/costume-model.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  costumeModel: CostumeModelComponent;

  constructor(private costumeModelService: CostumeModelService) {
  }

  ngOnInit() {
    this.costumeModel = this.costumeModelService.costumeModel;
    this.costumeModelService.costumeModelChanged.subscribe(
      (costumeModel: CostumeModelComponent) => {
        this.costumeModel = costumeModel;
      });
  }

}
