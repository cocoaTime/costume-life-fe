import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../authorization/services';
import {Role, User} from '../authorization/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentPage: string;
  currentUser: User;
  @Output() pageSelected = new EventEmitter<string>();

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) {
    this.currentPage = 'main';
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
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
  }

}
