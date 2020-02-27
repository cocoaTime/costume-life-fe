import { Component, OnInit } from '@angular/core';
import {CostumeModelService} from '../costume-list/costume-model.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  costumeId: string;

  constructor(private costumeModelService: CostumeModelService) {
  }

  ngOnInit() {
    this.costumeId = this.costumeModelService.costumeId;
    this.costumeModelService.costumeIdChanged.subscribe(
      (costumeId: string) => {
        this.costumeId = costumeId;
      });
  }

}
