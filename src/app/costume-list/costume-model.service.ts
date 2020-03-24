import {EventEmitter} from '@angular/core';
import {RangeComponent} from '../calendar/datepicker-range/range.component';
import {DateRangeComponent} from '../calendar/datepicker-range/date-range.component';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';

export class CostumeModelService {
  rangesChanged = new EventEmitter<RangeComponent[]>();
  costumeIdChanged = new EventEmitter<string>();
  costumeVendorCodeChanged = new EventEmitter<string>();
  costumeSizeChanged = new EventEmitter<string>();

  ranges: RangeComponent[] = [];
  costumeId: string;
  costumeVendorCode: string;
  costumeSize: string;

  constructor() { }

  setCostumeId(costumeId: string, costumeVendorCode: string, costumeSize: string) {
    this.costumeId = costumeId;
    this.ranges = this.getCostumeIdRanges(costumeId);
    this.costumeVendorCode = costumeVendorCode;
    this.costumeSize = costumeSize;

    this.rangesChanged.emit(this.ranges);
    this.costumeIdChanged.emit(this.costumeId);
    this.costumeVendorCodeChanged.emit(this.costumeVendorCode);
    this.costumeSizeChanged.emit(this.costumeSize);
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
