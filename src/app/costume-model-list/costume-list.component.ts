import { Component, OnInit } from '@angular/core';
import { CostumeModelComponent } from './costume-model/costume-model.component';
import {SizeGroupComponent} from './size-group.component';
import {CostumeComponent} from './costume.component';

@Component({
  selector: 'app-costume-list',
  templateUrl: './costume-list.component.html',
  styleUrls: ['./costume-list.component.css']
})
export class CostumeListComponent implements OnInit {
  costumeModels: CostumeModelComponent[] = [
    new CostumeModelComponent(
      1,
      'Костюм Ван Хельсинга',
      '32454253',
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
      '9876768',
      'https://mi-parti.com.ua/components/com_mijoshop/opencart/image/cache/data/Fotoset8/IMG_0496-396x600.jpg',
      [
        new SizeGroupComponent('XXL', [
          new CostumeComponent(9, false)])
      ])
  ];

  constructor() { }

  ngOnInit() {
  }

}
