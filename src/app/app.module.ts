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
import { DatepickerRangeComponent } from './calendar/datepicker-range/datepicker-range';
import { registerLocaleData } from '@angular/common';
import localeUa from '@angular/common/locales/ru-UA';
import { OrderListComponent } from './order-list/order-list.component';
import { FindOrderComponent } from './order-list/find-order/find-order.component';
import { SearchPlaceService } from './search-place/search-place.service';
import {CostumeModelComponent} from './costume-list/costume-model/costume-model.component';

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
    FindOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    SearchPlaceService,
    {provide: LOCALE_ID, useValue: 'ru-UA'}
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
