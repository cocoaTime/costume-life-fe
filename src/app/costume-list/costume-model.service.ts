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
    this.ranges = this.getCostumeRanges(costumeModel.vendorCode);
    this.costumeModel = costumeModel;

    this.rangesChanged.emit(this.ranges);
    this.costumeModelChanged.emit(this.costumeModel);
  }

  private getCostumeRanges(costumeVendorCode: string): RangeComponent[] {
    // TODO
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
