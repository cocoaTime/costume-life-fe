import {Component, OnInit} from '@angular/core';
import {NgbDate, NgbCalendar, NgbPopover, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {RangeComponent} from './range.component';
import {DateRangeComponent} from './date-range.component';
import {CostumeModelService} from '../../costume-list/costume-model.service';
import {CurrentOrderService} from '../../current-order/current-order.service';
import {ConfiguredCostumeComponent} from '../../current-order/configured-costume.component';

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

    .custom-day.dangerous {
      background-color: rgb(216, 33, 0);
      color: white;
    }

    .custom-day.faded {
      background-color: rgba(2, 117, 216, 0.5);
    }
  `]
})
export class DatepickerRangeComponent implements OnInit {
  ranges: RangeComponent[] = [];
  currentOrderItems: ConfiguredCostumeComponent[] = [];
  costumeId: string;
  costumeVendorCode: string;
  costumeSize: string;
  currentRange: RangeComponent = new RangeComponent(
    new DateRangeComponent(),
    new DateRangeComponent(),
    new DateRangeComponent()
  );

  constructor(private calendar: NgbCalendar,
              private costumeModelService: CostumeModelService,
              private ngbDateParserFormatter: NgbDateParserFormatter,
              private currentOrderService: CurrentOrderService) {
    this.currentRange.setCalendar(this.calendar);
  }

  onDateSelection(date: NgbDate, popOver: NgbPopover) {
    if (!this.currentRange.orderRange.fromDate && !this.currentRange.orderRange.toDate) {
      this.currentRange.animatedBeforeOrderRange.chosen = true;
      this.currentRange.animatedAfterOrderRange.chosen = false;

      this.currentRange.orderRange.fromDate = date;
      popOver.close();

      if (this.calendar.getWeekday(date) !== 1) {
        const prevDay = this.calendar.getPrev(date, 'd', 1);
        this.currentRange.animatedBeforeOrderRange.fromDate = prevDay;
        this.currentRange.animatedBeforeOrderRange.toDate = prevDay;
      } else {
        this.currentRange.animatedBeforeOrderRange.fromDate = null;
        this.currentRange.animatedBeforeOrderRange.toDate = null;
      }
    } else if (this.currentRange.orderRange.fromDate &&
              !this.currentRange.orderRange.toDate &&
              (date.after(this.currentRange.orderRange.fromDate) || date.equals(this.currentRange.orderRange.fromDate))) {
      this.currentRange.animatedBeforeOrderRange.chosen = false;
      this.currentRange.animatedAfterOrderRange.chosen = false;

      this.currentRange.orderRange.toDate = date;

      let endServiceDate = this.calendar.getNext(date, 'd', 1);
      this.currentRange.animatedAfterOrderRange.fromDate = endServiceDate;
      while ([6, 7].includes(this.calendar.getWeekday(endServiceDate))) {
        endServiceDate = this.calendar.getNext(endServiceDate, 'd', 1);
      }
      this.currentRange.animatedAfterOrderRange.toDate = endServiceDate;
      popOver.open();

      this.currentRange.beforeOrderRange = {...this.currentRange.animatedBeforeOrderRange};
      this.currentRange.afterOrderRange = {...this.currentRange.animatedAfterOrderRange};

      this.currentRange.animatedBeforeOrderRange = new DateRangeComponent(null, null);
      this.currentRange.animatedAfterOrderRange = new DateRangeComponent(null, null);
    } else {
      this.currentRange.animatedBeforeOrderRange.chosen = true;
      this.currentRange.animatedAfterOrderRange.chosen = false;

      this.currentRange.orderRange.fromDate = date;
      this.currentRange.orderRange.toDate = null;
      popOver.close();

      this.currentRange.animatedBeforeOrderRange.fromDate = this.calendar.getPrev(date, 'd', 1);
      this.currentRange.animatedBeforeOrderRange.toDate = this.calendar.getPrev(date, 'd', 1);

      this.currentRange.beforeOrderRange = new DateRangeComponent(null, null);
      this.currentRange.afterOrderRange = new DateRangeComponent(null, null);
    }
  }

  addItemToCurrentOrder() {
    const configuredCostume = new ConfiguredCostumeComponent(
      this.costumeId,
      this.costumeSize,
      this.currentRange.beforeOrderRange,
      this.currentRange.orderRange,
      this.currentRange.afterOrderRange);
    this.currentOrderService.addItem(configuredCostume);
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

  isDangerous(beforeOrderRange: DateRangeComponent, date: NgbDate, afterOrderRange: DateRangeComponent) {
    let inRanges;
    for (const range of this.ranges) {
      let firstRangeDate = range.beforeOrderRange.fromDate;
      if (firstRangeDate === null) {
        firstRangeDate = range.orderRange.fromDate;
      }
      const secondRangeDate = range.afterOrderRange.toDate;
      if (date.after(firstRangeDate) && date.before(secondRangeDate)
        || date.equals(firstRangeDate) || date.equals(secondRangeDate)) {
        inRanges = true;
      }
    }

    let firstDate = beforeOrderRange.fromDate;
    if (firstDate === null) {
      firstDate = this.currentRange.hoveredDate;
    }
    const secondDate = afterOrderRange.toDate;
    const insideRange = (date.after(firstDate)
      && date.before(secondDate));
    const equalToServiceOrRangeDays = date.equals(firstDate)
      || date.equals(secondDate);
    return (insideRange || equalToServiceOrRangeDays) && inRanges;
  }

  isServiceDay(beforeOrderRange: DateRangeComponent, date: NgbDate, afterOrderRange: DateRangeComponent) {
    return (date.equals(beforeOrderRange.fromDate) || date.equals(beforeOrderRange.toDate) ||
           (date.after(beforeOrderRange.fromDate) && date.before(beforeOrderRange.toDate))) ||
           (date.equals(afterOrderRange.fromDate) || date.equals(afterOrderRange.toDate) ||
           (date.after(afterOrderRange.fromDate) && date.before(afterOrderRange.toDate)));
  }

  isServiceDayForSavedRanges(date: NgbDate) {
    for (const range of this.ranges) {
      if (this.isServiceDay(range.beforeOrderRange, date, range.afterOrderRange)) {
        return true;
      }
    }
    return false;
  }

  ngOnInit(): void {
    this.ranges = this.costumeModelService.ranges;
    this.costumeModelService.rangesChanged.subscribe(
      (ranges: RangeComponent[]) => {
        this.ranges = ranges;
      });

    this.costumeId = this.costumeModelService.costumeId;
    this.costumeModelService.costumeIdChanged.subscribe(
      (costumeId: string) => {
        this.costumeId = costumeId;
      });

    this.costumeVendorCode = this.costumeModelService.costumeVendorCode;
    this.costumeModelService.costumeVendorCodeChanged.subscribe(
      (costumeVendorCode: string) => {
        this.costumeVendorCode = costumeVendorCode;
      });

    this.costumeSize = this.costumeModelService.costumeSize;
    this.costumeModelService.costumeSizeChanged.subscribe(
      (costumeSize: string) => {
        this.costumeSize = costumeSize;
      });

    this.currentOrderItems = this.currentOrderService.items;
    this.currentOrderService.itemsChanged.subscribe(
      (items: ConfiguredCostumeComponent[]) => {
        this.currentOrderItems = items;
      });
  }

  clearSelectedRange() {
    this.currentRange.animatedBeforeOrderRange.chosen = false;
    this.currentRange.animatedAfterOrderRange.chosen = false;

    this.currentRange.animatedBeforeOrderRange = new DateRangeComponent(null, null);
    this.currentRange.animatedAfterOrderRange = new DateRangeComponent(null, null);
    this.currentRange.clearStates();

    this.currentRange.orderRange.fromDate = null;
    this.currentRange.orderRange.toDate = null;

    this.currentRange.beforeOrderRange = new DateRangeComponent(null, null);
    this.currentRange.afterOrderRange = new DateRangeComponent(null, null);
  }
}
