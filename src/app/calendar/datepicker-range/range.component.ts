import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

export class RangeComponent {
  public hoveredDate: NgbDate;

  constructor(public fromDate: NgbDate, public toDate: NgbDate) {}
}
