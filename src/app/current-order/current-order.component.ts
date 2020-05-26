import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CurrentOrderService} from './current-order.service';
import {ConfiguredCostumeComponent} from './configured-costume.component';
import {NgbDateParserFormatter, NgbPopover, NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import {CostumeModelComponent} from '../costume-list/costume-model/costume-model.component';

@Component({
  selector: 'app-current-order',
  templateUrl: './current-order.component.html',
  styleUrls: ['./current-order.component.css']
})
export class CurrentOrderComponent implements OnInit {
  currentOrderForm: FormGroup;
  submitted = false;
  error = '';
  currentOrderItems: ConfiguredCostumeComponent[] = [];
  costumeModel: CostumeModelComponent;
  page = 1;
  price = 0;

  constructor(private formBuilder: FormBuilder,
              private currentOrderService: CurrentOrderService,
              private ratingConfig: NgbRatingConfig,
              private ngbDateParserFormatter: NgbDateParserFormatter) {
    ratingConfig.max = 5;
    ratingConfig.readonly = true;
  }

  ngOnInit() {
    this.currentOrderForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      money: ['', Validators.required],
      comment: []
    });

    this.currentOrderItems = this.currentOrderService.items;
    this.currentOrderService.itemsChanged.subscribe(
      (items: ConfiguredCostumeComponent[]) => {
        this.currentOrderItems = items;
      });

    for (const costume of this.currentOrderItems) {
      this.price = this.price + costume.costumeModel.price;
    }
  }

  onPageChange(pageNumber: number) {
    this.currentOrderService.setCurrentPage(pageNumber);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.currentOrderForm.controls;
  }

  onClick(costumeModel: CostumeModelComponent) {
    this.currentOrderService.setCostumeModel(costumeModel);
    this.costumeModel = costumeModel;
  }

  onSubmit(popOver: NgbPopover) {
    this.submitted = true;
    popOver.autoClose = 'inside';
    console.log(this.currentOrderForm.controls);

    // stop here if form is invalid
    if (this.currentOrderForm.invalid) {
      return;
    }

    this.error = 'Текст ошибки c бэка, ошибочка тут, просто жесть!'; // TODO
    if (this.error) {
      popOver.open();
    } else {
      popOver.close();
    }
  }
}
