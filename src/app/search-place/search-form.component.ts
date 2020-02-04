import {NgbDate} from '@ng-bootstrap/ng-bootstrap';

export class SearchFormComponent {
  constructor(public vendorCode: string, public date: NgbDate, public size: string, public gender: string) {}
}
