import {NgModule} from "@angular/core";

import {CommonModule} from "@angular/common";
import {HeaderComponent} from "../components/header/header.component";
import {CalendarComponent} from "../components/calendar/calendar.component";
import { MoneyPipe } from "../pipes/money.pipe";

@NgModule({
  declarations: [
    HeaderComponent,
    CalendarComponent,
    MoneyPipe
  ],

  imports: [CommonModule],

  exports: [
    CommonModule,
    HeaderComponent,
    CalendarComponent,
    MoneyPipe
  ]
})

export class SharedModule {

}
