import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import {DateRangeComponent} from './date-range.component';

export class RangeComponent {
  public hoveredDate: NgbDate;

  constructor(public beforeOrderRange: DateRangeComponent,
              public orderRange: DateRangeComponent,
              public afterOrderRange: DateRangeComponent) {}

}
