import { Component } from '@angular/core';
import {Role, User} from './authorization/models';
import {Router} from '@angular/router';
import {AuthenticationService} from './authorization/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageToLoad = 'main';
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  onNavigate(page: string) {
    this.pageToLoad = page;
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
