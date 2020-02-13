import {NgbCalendar, NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {DateRangeComponent} from './date-range.component';

export class RangeComponent {

  constructor(public beforeOrderRange: DateRangeComponent,
              public orderRange: DateRangeComponent,
              public afterOrderRange: DateRangeComponent) {}
  public hoveredDate: NgbDate;
  public animatedBeforeOrderRange: DateRangeComponent = new DateRangeComponent();
  public animatedAfterOrderRange: DateRangeComponent = new DateRangeComponent();

  private calendar: NgbCalendar;
  private animatedBeforeOrderRangeState: DateRangeComponent = new DateRangeComponent();
  private animatedAfterOrderRangeState: DateRangeComponent = new DateRangeComponent();

  static saveState(range: DateRangeComponent) {
    return new DateRangeComponent(range.fromDate, range.toDate, range.chosen);
  }

  setHoveredDate(date: NgbDate) {
    this.hoveredDate = date;
    this.animatedBeforeOrderRange = this.animatedBeforeOrderRangeState;
    this.animatedAfterOrderRange = this.animatedAfterOrderRangeState;

    if (!this.animatedBeforeOrderRange.chosen) {
      if (this.calendar.getWeekday(date) !== 1) {
        const prevDay = this.calendar.getPrev(date, 'd', 1);
        this.animatedBeforeOrderRange.fromDate = prevDay;
        this.animatedBeforeOrderRange.toDate = prevDay;
      } else {
        this.animatedBeforeOrderRange.fromDate = null;
        this.animatedBeforeOrderRange.toDate = null;
      }
    }

    if (!this.animatedAfterOrderRange.chosen) {
      let endServiceDate = this.calendar.getNext(date, 'd', 1);
      this.animatedAfterOrderRange.fromDate = endServiceDate;
      while ([6, 7].includes(this.calendar.getWeekday(endServiceDate))) {
        endServiceDate = this.calendar.getNext(endServiceDate, 'd', 1);
      }
      this.animatedAfterOrderRange.toDate = endServiceDate;
    }
  }

  deleteHoveredDate() {
    this.hoveredDate = null;
    this.animatedBeforeOrderRangeState = RangeComponent.saveState(this.animatedBeforeOrderRange);
    this.animatedAfterOrderRangeState = RangeComponent.saveState(this.animatedAfterOrderRange);

    this.animatedBeforeOrderRange = new DateRangeComponent();
    this.animatedAfterOrderRange = new DateRangeComponent();
  }

  setCalendar(calendar: NgbCalendar) {
    this.calendar = calendar;
  }
}
