import { Component, OnInit } from '@angular/core';
import { SizeGroupComponent } from '../size-group.component';

@Component({
  selector: 'app-costume-model',
  templateUrl: './costume-model.component.html',
  styleUrls: ['./costume-model.component.css']
})
export class CostumeModelComponent implements OnInit {
  id: number;
  name: string;
  consistsOf: string;
  vendorCode: string;
  imgPath: string;
  sizeGroups: SizeGroupComponent[];

  constructor(id: number, name: string, consistsOf: string, vendorCode: string, imgPath: string, sizeGroups: SizeGroupComponent[]) {
    this.id = id;
    this.name = name;
    this.consistsOf = consistsOf;
    this.vendorCode = vendorCode;
    this.imgPath = imgPath;
    this.sizeGroups = sizeGroups;
  }

  ngOnInit() {
  }

}
