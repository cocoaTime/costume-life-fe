import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-costume-model',
  templateUrl: './costume-model.component.html',
  styleUrls: ['./costume-model.component.css']
})
export class CostumeModelComponent implements OnInit {
  name: string;
  consistsOf: string;
  price: number;
  vendorCode: string;
  imgPath: string;
  rate: number;
  size: string;
  available: boolean;

  constructor(name: string, consistsOf: string, price: number,
              vendorCode: string, imgPath: string, size: string, available: boolean, rate: number) {
    this.name = name;
    this.consistsOf = consistsOf;
    this.price = price;
    this.vendorCode = vendorCode;
    this.imgPath = imgPath;
    this.size = size;
    this.rate = rate;
    this.available = available;
  }

  ngOnInit() {
  }

}
