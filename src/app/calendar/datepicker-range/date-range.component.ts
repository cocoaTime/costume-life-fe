import {NgbDate} from '@ng-bootstrap/ng-bootstrap';

export class DateRangeComponent {
  constructor(public fromDate?: NgbDate, public toDate?: NgbDate, public chosen?: boolean) {}
}
