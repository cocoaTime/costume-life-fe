import {Component, OnInit} from '@angular/core';
import { CostumeModelComponent } from './costume-model/costume-model.component';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {SearchPlaceService} from '../search-place/search-place.service';
import {CostumeListService} from './costume-list.service';

@Component({
  selector: 'app-costume-list',
  templateUrl: './costume-list.component.html',
  styleUrls: ['./costume-list.component.css'],
  providers: [ NgbModalConfig, NgbModal ]
})
export class CostumeListComponent implements OnInit {
  costumeModels: CostumeModelComponent[] = [];

  constructor(private searchFormService: SearchPlaceService, private costumeListService: CostumeListService) {
  }

  ngOnInit() {
    this.costumeModels = this.searchFormService.costumeModels;
    this.searchFormService.costumeModelsChanged.subscribe(
      (costumeModels: CostumeModelComponent[]) => {
        this.costumeModels = costumeModels;
      });
  }

  onClick(costumeId: string) {
    this.costumeListService.setCostumeId(costumeId);
  }

}
