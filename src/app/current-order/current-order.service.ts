import {EventEmitter, Injectable} from '@angular/core';
import {ConfiguredCostumeComponent} from './configured-costume.component';
import {AuthenticationService} from '../authorization/services';
import {User} from '../authorization/models';
import {HttpClient} from '@angular/common/http';
import {DateRangeComponent} from '../calendar/datepicker-range/date-range.component';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {CostumeModelComponent} from '../costume-list/costume-model/costume-model.component';
import {RangeComponent} from './current-order-datepicker-range/range.component';

@Injectable({
  providedIn: 'root'
})
export class CurrentOrderService {
  itemsChanged = new EventEmitter<ConfiguredCostumeComponent[]>();
  rangesChanged = new EventEmitter<RangeComponent[]>();
  costumeModelChanged = new EventEmitter<CostumeModelComponent>();

  page: number;
  items: ConfiguredCostumeComponent[] = [];
  ranges: RangeComponent[] = [];
  costumeModel: CostumeModelComponent;
  currentUser: User;

  constructor(private authenticationService: AuthenticationService,
              private http: HttpClient,
              private auth: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.refreshItems();
  }

  setCostumeModel(costumeModel: CostumeModelComponent) {
    if (costumeModel !== null) {
      this.refreshRanges(costumeModel.vendorCode);
    } else {
      this.ranges = [];
    }
    this.costumeModel = costumeModel;

    this.rangesChanged.emit(this.ranges);
    this.costumeModelChanged.emit(this.costumeModel);
  }

  setCurrentPage(page: number) {
    this.page = page;
    this.refreshItems();
    this.itemsChanged.emit(this.items);
  }

  addItem(item: ConfiguredCostumeComponent) {
    // TODO
    this.refreshItems();
    this.itemsChanged.emit(this.items);
  }

  removeItem(itemId: string) {
    // TODO
    this.refreshItems();
    this.itemsChanged.emit(this.items);
  }

  private refreshRanges(costumeVendorCode: string) {
    // TODO
    this.ranges = [
      new RangeComponent(
        new DateRangeComponent(
          new NgbDate(2020, 2, 3), new NgbDate(2020, 2, 3)
        ),
        new DateRangeComponent(
          new NgbDate(2020, 2, 4), new NgbDate(2020, 2, 4)
        ),
        new DateRangeComponent(
          new NgbDate(2020, 2, 5), new NgbDate(2020, 2, 5)
        )
      ),
      new RangeComponent(
        new DateRangeComponent(
          new NgbDate(2020, 3, 19), new NgbDate(2020, 3, 19)
        ),
        new DateRangeComponent(
          new NgbDate(2020, 3, 20), new NgbDate(2020, 3, 20)
        ),
        new DateRangeComponent(
          new NgbDate(2020, 3, 21), new NgbDate(2020, 3, 23)
        )
      ),
      new RangeComponent(
        new DateRangeComponent(
          null, null
        ),
        new DateRangeComponent(
          new NgbDate(2020, 4, 13), new NgbDate(2020, 4, 13)
        ),
        new DateRangeComponent(
          new NgbDate(2020, 4, 14), new NgbDate(2020, 4, 14)
        )
      )
    ];
  }

  refreshItems() {
    // TODO: BE: getBucket(this.page, this.auth.currentUserValue.username)
    this.items = [
      new ConfiguredCostumeComponent(
        new CostumeModelComponent(
          'Костюм Ван Хельсинга',
          'плащ, жилетка, шляпа',
          500,
          '122008',
          'https://mi-parti.com.ua/components/com_mijoshop/opencart/image/cache/data/Fotoset22/IVM_6948-396x600.JPG',

          'XL',
          true,
          5),
        new DateRangeComponent(
          new NgbDate(2020, 2, 13), new NgbDate(2020, 2, 13)
        ),
        new DateRangeComponent(
          new NgbDate(2020, 2, 14), new NgbDate(2020, 2, 14)
        ),
        new DateRangeComponent(
          new NgbDate(2020, 2, 15), new NgbDate(2020, 2, 15)
        )
      ),
      new ConfiguredCostumeComponent(
        new CostumeModelComponent(
          'Костюм весёлой Минни Маус',
          'платье, ушки',
          550,
          '122007',
          'https://mi-parti.com.ua/components/com_mijoshop/opencart/image/cache/data/Fotoset8/IMG_0496-396x600.jpg',
          'XXL',
          false,
          4),
        new DateRangeComponent(
          new NgbDate(2020, 3, 14), new NgbDate(2020, 3, 14)
        ),
        new DateRangeComponent(
          new NgbDate(2020, 3, 15), new NgbDate(2020, 3, 15)
        ),
        new DateRangeComponent(
          new NgbDate(2020, 3, 16), new NgbDate(2020, 3, 16)
        )
      )
    ];
  }
}
