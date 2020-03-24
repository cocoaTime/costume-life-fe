import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../authorization/services';
import {Role, User} from '../authorization/models';
import {CurrentOrderService} from '../current-order/current-order.service';
import {ConfiguredCostumeComponent} from '../current-order/configured-costume.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentPage = 'main';
  currentUser: User;
  currentOrderItemsCount: number;
  @Output() pageSelected = new EventEmitter<string>();

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private currentOrderService: CurrentOrderService) {
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  onSelect(page: string) {
    this.currentPage = page;
    this.pageSelected.emit(this.currentPage);
  }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

    this.currentOrderItemsCount = this.currentOrderService.items.length;
    this.currentOrderService.itemsChanged.subscribe(
      (items: ConfiguredCostumeComponent[]) => {
        this.currentOrderItemsCount = items.length;
      });
  }
}
