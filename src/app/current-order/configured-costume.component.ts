import {DateRangeComponent} from '../calendar/datepicker-range/date-range.component';

export class ConfiguredCostumeComponent {
  constructor(public costumeVendorCode: string,
              public costumeSize: string,
              public beforeOrderRange: DateRangeComponent,
              public orderRange: DateRangeComponent,
              public afterOrderRange: DateRangeComponent,
              public id?: string) {}
}
