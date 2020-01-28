import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageToLoad = 'main';

  onNavigate(page: string) {
    this.pageToLoad = page;
  }
}
