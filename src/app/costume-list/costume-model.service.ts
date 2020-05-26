import {EventEmitter} from '@angular/core';
import {RangeComponent} from '../calendar/datepicker-range/range.component';
import {DateRangeComponent} from '../calendar/datepicker-range/date-range.component';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {CostumeModelComponent} from './costume-model/costume-model.component';

export class CostumeModelService {
  rangesChanged = new EventEmitter<RangeComponent[]>();
  costumeModelChanged = new EventEmitter<CostumeModelComponent>();

  ranges: RangeComponent[] = [];
  costumeModel: CostumeModelComponent;

  constructor() { }

  setCostumeModel(costumeModel: CostumeModelComponent) {
    if (costumeModel !== null) {
      this.refreshRanges(costumeModel.vendorCode);
    } else {
      this.ranges = [];
    }
    this.costumeModel = costumeModel;

    this.rangesChanged.emit(this.ranges);
    this.costumeModelChanged.emit(this.costumeModel);
  }

  private refreshRanges(costumeVendorCode: string) {
    // TODO
    this.ranges = [
      new RangeComponent(
        new DateRangeComponent(
          new NgbDate(2020, 5, 11), new NgbDate(2020, 5, 11)
        ),
        new DateRangeComponent(
          new NgbDate(2020, 5, 12), new NgbDate(2020, 5, 14)
        ),
        new DateRangeComponent(
          new NgbDate(2020, 5, 15), new NgbDate(2020, 5, 15)
        )
      ),
      new RangeComponent(
        new DateRangeComponent(
          new NgbDate(2020, 7, 1), new NgbDate(2020, 7, 1)
        ),
        new DateRangeComponent(
          new NgbDate(2020, 7, 2), new NgbDate(2020, 7, 3)
        ),
        new DateRangeComponent(
          new NgbDate(2020, 7, 4), new NgbDate(2020, 7, 6)
        )
      ),
      new RangeComponent(
        new DateRangeComponent(
          null, null
        ),
        new DateRangeComponent(
          new NgbDate(2020, 6, 15), new NgbDate(2020, 6, 19)
        ),
        new DateRangeComponent(
          new NgbDate(2020, 6, 20), new NgbDate(2020, 6, 22)
        )
      )
    ];
  }
}
