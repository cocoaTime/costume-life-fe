import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentPage: string;
  @Output() pageSelected = new EventEmitter<string>();

  onSelect(page: string) {
    this.currentPage = page;
    this.pageSelected.emit(this.currentPage);
  }

  constructor() {
    this.currentPage = 'main';
  }

  ngOnInit() {
  }

}
