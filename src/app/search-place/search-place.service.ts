import {EventEmitter} from '@angular/core';
import {SearchFormComponent} from './search-form.component';
import {CostumeModelComponent} from '../costume-list/costume-model/costume-model.component';
import {SizeGroupComponent} from '../costume-list/size-group.component';
import {CostumeComponent} from '../costume-list/costume.component';

export class SearchPlaceService  {
  costumeModelsChanged = new EventEmitter<CostumeModelComponent[]>();
  costumeModels: CostumeModelComponent[] = [];

  constructor() {
  }

  setSearchForm(searchForm: SearchFormComponent) {
    this.costumeModels = this.getCostumeModelsBySearchCriteria(searchForm);
    this.costumeModelsChanged.emit(this.costumeModels);
  }

  private getCostumeModelsBySearchCriteria(searchForm: SearchFormComponent): CostumeModelComponent[] {
    return [
      new CostumeModelComponent(
        1,
        'Костюм Ван Хельсинга',
        'плащ, жилетка, шляпа',
        '122008',
        'https://mi-parti.com.ua/components/com_mijoshop/opencart/image/cache/data/Fotoset22/IVM_6948-396x600.JPG',

        [
          new SizeGroupComponent('M', [
            new CostumeComponent(1, false),
            new CostumeComponent(2, true),
            new CostumeComponent(3, true)]),
          new SizeGroupComponent('XL', [
            new CostumeComponent(4, false),
            new CostumeComponent(5, false),
            new CostumeComponent(6, true)]),
          new SizeGroupComponent('XXL', [
            new CostumeComponent(7, true),
            new CostumeComponent(9, true)])
        ]),
      new CostumeModelComponent(
        2,
        'Костюм весёлой Минни Маус',
        'платье, ушки',
        '122007',
        'https://mi-parti.com.ua/components/com_mijoshop/opencart/image/cache/data/Fotoset8/IMG_0496-396x600.jpg',
        [
          new SizeGroupComponent('XXL', [
            new CostumeComponent(9, false)])
        ]),
      new CostumeModelComponent(
        3,
        'Костюм Джона Сноу',
        'сюртук, брюки, пояс, имитация сапог, плащ',
        '122006',
        'https://mi-parti.com.ua/components/com_mijoshop/opencart/image/cache/data/Fotoset15/IVM_3003-396x600.JPG',
        [
          new SizeGroupComponent('M', [
            new CostumeComponent(10, true)])
        ])
    ];
  }

}
