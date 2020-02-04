import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import { CostumeModelComponent } from './costume-model/costume-model.component';
import {SizeGroupComponent} from './size-group.component';
import {CostumeComponent} from './costume.component';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {SearchPlaceService} from '../search-place/search-place.service';
import {SearchFormComponent} from '../search-place/search-form.component';

@Component({
  selector: 'app-costume-list',
  templateUrl: './costume-list.component.html',
  styleUrls: ['./costume-list.component.css'],
  providers: [ NgbModalConfig, NgbModal ]
})
export class CostumeListComponent implements OnInit {
  costumeModels: CostumeModelComponent[] = [];

  constructor(private searchFormService: SearchPlaceService) {
  }

  ngOnInit() {
    this.costumeModels = this.searchFormService.costumeModels;
    this.searchFormService.costumeModelsChanged.subscribe(
      (costumeModels: CostumeModelComponent[]) => {
        this.costumeModels = costumeModels;
      });
  }

}
