import {Component, OnInit} from '@angular/core';
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {RangeComponent} from './range.component';
import {DateRangeComponent} from './date-range.component';
import {CostumeListService} from '../../costume-list/costume-list.service';

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

    .custom-day.service-day {
      background-color: rgb(215, 216, 215);
      color: white;
    }

    .custom-day.faded {
      background-color: rgba(2, 117, 216, 0.5);
    }
  `]
})
export class DatepickerRangeComponent implements OnInit {
  ranges: RangeComponent[] = [];
  currentRange: RangeComponent = new RangeComponent(
    new DateRangeComponent(null, null),
    new DateRangeComponent(null, null),
    new DateRangeComponent(null, null)
  );

  constructor(private calendar: NgbCalendar, private costumeListService: CostumeListService) {
  }

  onDateSelection(date: NgbDate) {
    if (!this.currentRange.orderRange.fromDate && !this.currentRange.orderRange.toDate) {
      this.currentRange.orderRange.fromDate = date;
    } else if (this.currentRange.orderRange.fromDate &&
              !this.currentRange.orderRange.toDate &&
              (date.after(this.currentRange.orderRange.fromDate) || date.equals(this.currentRange.orderRange.fromDate))) {
      this.currentRange.orderRange.toDate = date;
    } else {
      this.currentRange.orderRange.toDate = null;
      this.currentRange.orderRange.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.currentRange.orderRange.fromDate &&
           !this.currentRange.orderRange.toDate &&
           this.currentRange.hoveredDate &&
           date.after(this.currentRange.orderRange.fromDate) &&
           date.before(this.currentRange.hoveredDate);
  }

  isInside(date: NgbDate) {
    let inRanges;
    for (const range of this.ranges) {
      if (date.after(range.orderRange.fromDate) && date.before(range.orderRange.toDate)) {
        inRanges = true;
      }
    }
    return (date.after(this.currentRange.orderRange.fromDate) && date.before(this.currentRange.orderRange.toDate)) || inRanges;
  }

  isRange(date: NgbDate) {
    let inRanges;
    for (const range of this.ranges) {
      if (date.equals(range.orderRange.fromDate) || date.equals(range.orderRange.toDate)) {
        inRanges = true;
      }
    }
    return date.equals(this.currentRange.orderRange.fromDate) ||
           date.equals(this.currentRange.orderRange.toDate) ||
           this.isInside(date) ||
           this.isHovered(date) ||
           inRanges;
  }

  isServiceDay(date: NgbDate) {
    return 1 === date.day;
  }

  ngOnInit(): void {
    this.ranges = this.costumeListService.ranges;
    this.costumeListService.rangesChanged.subscribe(
      (ranges: RangeComponent[]) => {
        this.ranges = ranges;
      });
  }
}
