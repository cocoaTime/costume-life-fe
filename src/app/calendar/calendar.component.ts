import { Component, OnInit } from '@angular/core';
import {CostumeListService} from '../costume-list/costume-list.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  costumeId: string;

  constructor(private costumeListService: CostumeListService) {
  }

  ngOnInit() {
    this.costumeId = this.costumeListService.costumeId;
    this.costumeListService.costumeIdChanged.subscribe(
      (costumeId: string) => {
        this.costumeId = costumeId;
      });
  }

}
