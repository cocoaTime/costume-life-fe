import {EventEmitter, Injectable} from '@angular/core';
import {RangeComponent} from '../calendar/datepicker-range/range.component';
import {DateRangeComponent} from '../calendar/datepicker-range/date-range.component';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class CostumeListService {
  rangesChanged = new EventEmitter<RangeComponent[]>();
  costumeIdChanged = new EventEmitter<string>();
  ranges: RangeComponent[] = [];
  costumeId: string;

  constructor() { }

  setCostumeId(costumeId: string) {
    this.costumeId = costumeId;
    this.ranges = this.getCostumeIdRanges(costumeId);
    this.rangesChanged.emit(this.ranges);
    this.costumeIdChanged.emit(this.costumeId);
  }

  private getCostumeIdRanges(costumeId: string): RangeComponent[] {
    return [
      new RangeComponent(
        new DateRangeComponent(
          new NgbDate(2020, 2, 3), new NgbDate(2020, 2, 3)
        ),
        new DateRangeComponent(
          new NgbDate(2020, 2, 4), new NgbDate(2020, 2, 4)
        ),
        new DateRangeComponent(
          new NgbDate(2020, 2, 5), new NgbDate(2020, 2, 5)
        )
      ),
      new RangeComponent(
        new DateRangeComponent(
          new NgbDate(2020, 3, 19), new NgbDate(2020, 3, 19)
        ),
        new DateRangeComponent(
          new NgbDate(2020, 3, 20), new NgbDate(2020, 3, 20)
        ),
        new DateRangeComponent(
          new NgbDate(2020, 3, 21), new NgbDate(2020, 3, 23)
        )
      ),
      new RangeComponent(
        new DateRangeComponent(
          null, null
        ),
        new DateRangeComponent(
          new NgbDate(2020, 4, 13), new NgbDate(2020, 4, 13)
        ),
        new DateRangeComponent(
          new NgbDate(2020, 4, 14), new NgbDate(2020, 4, 14)
        )
      )
    ];
  }
}
