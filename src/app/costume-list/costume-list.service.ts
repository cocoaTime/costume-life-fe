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
        new DateRangeComponent(null, null),
        new DateRangeComponent(
          new NgbDate(2020, 1, 1), new NgbDate(2020, 1, 3)
        ),
        new DateRangeComponent(null, null)
      ),
      new RangeComponent(
        new DateRangeComponent(null, null),
        new DateRangeComponent(
          new NgbDate(2020, 1, 21), new NgbDate(2020, 1, 23)
        ),
        new DateRangeComponent(null, null)
      ),
      new RangeComponent(
        new DateRangeComponent(null, null),
        new DateRangeComponent(
          new NgbDate(2020, 2, Number(costumeId) + 7), new NgbDate(2020, 2, Number(costumeId) + 9)
        ),
        new DateRangeComponent(null, null)
      ),
      new RangeComponent(
        new DateRangeComponent(null, null),
        new DateRangeComponent(
          new NgbDate(2020, 2, Number(costumeId)), new NgbDate(2020, 2, Number(costumeId) + 3)
        ),
        new DateRangeComponent(null, null)
      ),
      new RangeComponent(
        new DateRangeComponent(null, null),
        new DateRangeComponent(
          new NgbDate(2020, 3, Number(costumeId) + 4), new NgbDate(2020, 3, Number(costumeId) + 8)
        ),
        new DateRangeComponent(null, null)
      ),
      new RangeComponent(
        new DateRangeComponent(null, null),
        new DateRangeComponent(
          new NgbDate(2020, 4, 16), new NgbDate(2020, 4, 19)
        ),
        new DateRangeComponent(null, null)
      )
    ];
  }
}
