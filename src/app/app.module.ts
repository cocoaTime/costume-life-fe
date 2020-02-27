import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SearchPlaceComponent } from './search-place/search-place.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CostumeListComponent } from './costume-list/costume-list.component';
import { DatepickerRangeComponent } from './calendar/datepicker-range/datepicker-range.component';
import { registerLocaleData } from '@angular/common';
import localeUa from '@angular/common/locales/ru-UA';
import { OrderListComponent } from './order-list/order-list.component';
import { FindOrderComponent } from './order-list/find-order/find-order.component';
import { SearchPlaceService } from './search-place/search-place.service';
import {CostumeModelComponent} from './costume-list/costume-model/costume-model.component';
import { CurrentOrderComponent } from './current-order/current-order.component';
import {CostumeModelService} from './costume-list/costume-model.service';
import {FocusRemoverDirective} from './directives/button-focus-remover';
import {ClickOutsideDirective} from './directives/click-outside.directive';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AdminComponent} from './authorization/admin';
import {HomeComponent} from './authorization/home';
import {LoginComponent} from './authorization/login';
import {ErrorInterceptor, fakeBackendProvider, JwtInterceptor} from './authorization/helpers';
import {routing} from './app.routing';
import { MainComponent } from './main/main.component';
import { StatisticsComponent } from './statistics/statistics.component';

registerLocaleData(localeUa);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SearchPlaceComponent,
    CalendarComponent,
    CostumeListComponent,
    CostumeModelComponent,
    DatepickerRangeComponent,
    OrderListComponent,
    FindOrderComponent,
    CurrentOrderComponent,
    FocusRemoverDirective,
    ClickOutsideDirective,
    HomeComponent,
    AdminComponent,
    LoginComponent,
    MainComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing
  ],
  providers: [
    SearchPlaceService,
    CostumeModelService,
    {provide: LOCALE_ID, useValue: 'ru-UA'},
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
