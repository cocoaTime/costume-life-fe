import {EventEmitter, Injectable} from '@angular/core';
import {SearchFormComponent} from './search-form.component';
import {CostumeModelComponent} from '../costume-list/costume-model/costume-model.component';
import {SizeGroupComponent} from '../costume-list/size-group.component';
import {CostumeComponent} from '../costume-list/costume.component';

@Injectable({
  providedIn: 'root'
})
export class SearchPlaceService  {
  costumeModelsChanged = new EventEmitter<CostumeModelComponent[]>();
  costumeModels: CostumeModelComponent[] = [];
  searchForm: SearchFormComponent;
  page: number;
  all: CostumeModelComponent[] = []; // temp

  constructor() {
  }

  setSearchForm(searchForm: SearchFormComponent) {
    this.searchForm = searchForm;
    this.costumeModels = this.getCostumeModelsBySearchCriteria(1, this.searchForm);
    this.costumeModelsChanged.emit(this.costumeModels);
  }

  setCostumeModels(costumeModels: CostumeModelComponent[]) {
    this.costumeModels = costumeModels;
    this.costumeModelsChanged.emit(this.costumeModels);
  }

  setCurrentPage(page: number) {
    this.page = page;
    this.costumeModels = this.getCostumeModelsBySearchCriteria(this.page, this.searchForm);
    this.costumeModelsChanged.emit(this.costumeModels);
  }

  private getCostumeModelsBySearchCriteria(pageNumber: number, searchForm: SearchFormComponent): CostumeModelComponent[] {
    const costumes: CostumeModelComponent[] = [
      new CostumeModelComponent(
        1,
        'Костюм Ван Хельсинга',
        'плащ, жилетка, шляпа',
        '500',
        '122008',
        'https://mi-parti.com.ua/components/com_mijoshop/opencart/image/cache/data/Fotoset22/IVM_6948-396x600.JPG',

        [
          new SizeGroupComponent('M', [
            new CostumeComponent('1', false),
            new CostumeComponent('2', true),
            new CostumeComponent('3', true)]),
          new SizeGroupComponent('XL', [
            new CostumeComponent('4', false),
            new CostumeComponent('5', false),
            new CostumeComponent('6', true)]),
          new SizeGroupComponent('XXL', [
            new CostumeComponent('7', true),
            new CostumeComponent('8', true)])
        ],
        5),
      new CostumeModelComponent(
        2,
        'Костюм весёлой Минни Маус',
        'платье, ушки',
        '550',
        '122007',
        'https://mi-parti.com.ua/components/com_mijoshop/opencart/image/cache/data/Fotoset8/IMG_0496-396x600.jpg',
        [
          new SizeGroupComponent('XXL', [
            new CostumeComponent('9', false)])
        ],
        4),
      new CostumeModelComponent(
        3,
        'Костюм Джона Сноу',
        'сюртук, брюки, пояс, имитация сапог, плащ',
        '600',
        '122006',
        'https://mi-parti.com.ua/components/com_mijoshop/opencart/image/cache/data/Fotoset15/IVM_3003-396x600.JPG',
        [
          new SizeGroupComponent('M', [
            new CostumeComponent('10', true)])
        ],
        3)
    ];

    if (this.all.length === 0) {
      this.all = costumes.slice();
      this.all.push(costumes[1]);
      this.all.push(costumes[2]);
      this.all.push(costumes[1]);
    }

    const result = this.all.slice();
    for (let i = 0; i < result.length; i++) {
      result[i] = this.all[(i + 1) % result.length];
    }
    this.all = result.slice();

    return result;
  }

}
