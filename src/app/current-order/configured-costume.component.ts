import {DateRangeComponent} from '../calendar/datepicker-range/date-range.component';
import {CostumeModelComponent} from '../costume-list/costume-model/costume-model.component';

export class ConfiguredCostumeComponent {
  constructor(public costumeModel: CostumeModelComponent,
              public beforeOrderRange: DateRangeComponent,
              public orderRange: DateRangeComponent,
              public afterOrderRange: DateRangeComponent) {}
}
