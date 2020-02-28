import {Component, OnInit} from '@angular/core';
import { CostumeModelComponent } from './costume-model/costume-model.component';
import {NgbModal, NgbModalConfig, NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import {SearchPlaceService} from '../search-place/search-place.service';
import {CostumeModelService} from './costume-model.service';

@Component({
  selector: 'app-costume-list',
  templateUrl: './costume-list.component.html',
  styleUrls: ['./costume-list.component.css'],
  providers: [ NgbModalConfig, NgbModal, NgbRatingConfig ]
})
export class CostumeListComponent implements OnInit {
  costumeModels: CostumeModelComponent[] = [];
  page = 1;

  constructor(private searchPlaceService: SearchPlaceService,
              private costumeListService: CostumeModelService,
              private ratingConfig: NgbRatingConfig) {
    ratingConfig.max = 5;
    ratingConfig.readonly = true;
  }

  ngOnInit() {
    this.costumeModels = this.searchPlaceService.costumeModels;
    this.searchPlaceService.costumeModelsChanged.subscribe(
      (costumeModels: CostumeModelComponent[]) => {
        this.costumeModels = costumeModels;
      });
  }

  onPageChange(pageNumber: number) {
    this.searchPlaceService.setCurrentPage(pageNumber);
  }

  onClick(costumeId: string, costumeVendorCode: string, costumeSize: string) {
    this.costumeListService.setCostumeId(costumeId, costumeVendorCode, costumeSize);
  }

}
