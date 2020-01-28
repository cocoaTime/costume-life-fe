import {Component} from '@angular/core';
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {RangeComponent} from './range.component';

@Component({
  selector: 'app-datepicker-range',
  templateUrl: './datepicker-range.html',
  styles: [`
    .custom-day {
      text-align: center;
      padding: 0.185rem 0.25rem;
      display: inline-block;
      height: 2rem;
      width: 2rem;
    }
    .custom-day.focused {
      background-color: #e6e6e6;
    }
    .custom-day.range, .custom-day:hover {
      background-color: rgb(2, 117, 216);
      color: white;
    }
    .custom-day.faded {
      background-color: rgba(2, 117, 216, 0.5);
    }
  `]
})
export class DatepickerRangeComponent {
  ranges: RangeComponent[];
  currentRange: RangeComponent;

  constructor(calendar: NgbCalendar) {
    this.ranges = [new RangeComponent().initWithDates(
                    new NgbDate(2020, 1, 1),
                    new NgbDate(2020, 1, 3)),
                   new RangeComponent().initWithDates(
                    new NgbDate(2020, 1, 21),
                    new NgbDate(2020, 1, 23)),
                   new RangeComponent().initWithDates(
                    new NgbDate(2020, 2, 17),
                    new NgbDate(2020, 2, 19)),
                   new RangeComponent().initWithDates(
                    new NgbDate(2020, 2, 7),
                    new NgbDate(2020, 2, 7)),
                   new RangeComponent().initWithDates(
                    new NgbDate(2019, 12, 17),
                    new NgbDate(2019, 12, 19)),
                   new RangeComponent().initWithDates(
                    new NgbDate(2020, 4, 7),
                    new NgbDate(2020, 4, 9))];
    this.currentRange = new RangeComponent();
  }

  onDateSelection(date: NgbDate) {
    if (!this.currentRange.fromDate && !this.currentRange.toDate) {
      this.currentRange.fromDate = date;
    } else if (this.currentRange.fromDate &&
              !this.currentRange.toDate &&
              (date.after(this.currentRange.fromDate) || date.equals(this.currentRange.fromDate))) {
      this.currentRange.toDate = date;
    } else {
      this.currentRange.toDate = null;
      this.currentRange.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.currentRange.fromDate &&
           !this.currentRange.toDate &&
           this.currentRange.hoveredDate &&
           date.after(this.currentRange.fromDate) &&
           date.before(this.currentRange.hoveredDate);
  }

  isInside(date: NgbDate) {
    let inRanges;
    for (const range of this.ranges) {
      if (date.after(range.fromDate) && date.before(range.toDate)) {
        inRanges = true;
      }
    }
    return (date.after(this.currentRange.fromDate) && date.before(this.currentRange.toDate)) || inRanges;
  }

  isRange(date: NgbDate) {
    let inRanges;
    for (const range of this.ranges) {
      if (date.equals(range.fromDate) || date.equals(range.toDate)) {
        inRanges = true;
      }
    }
    return date.equals(this.currentRange.fromDate) ||
           date.equals(this.currentRange.toDate) ||
           this.isInside(date) ||
           this.isHovered(date) ||
           inRanges;
  }
}
