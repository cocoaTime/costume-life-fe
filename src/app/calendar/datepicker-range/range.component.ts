import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

export class RangeComponent {
  public fromDate: NgbDate;
  public toDate: NgbDate;
  public hoveredDate: NgbDate;

  constructor() {}

  initWithDates(fromDate: NgbDate, toDate: NgbDate) {
    this.fromDate = fromDate;
    this.toDate = toDate;
    return this;
  }
}
