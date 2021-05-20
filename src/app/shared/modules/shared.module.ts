import {NgModule} from "@angular/core";

import {CommonModule} from "@angular/common";
import {HeaderComponent} from "../components/header/header.component";
import {CalendarComponent} from "../components/calendar/calendar.component";

@NgModule({
  declarations: [
    HeaderComponent,
    CalendarComponent
  ],

  imports: [CommonModule],

  exports: [
    CommonModule,
    HeaderComponent,
    CalendarComponent
  ]
})

export class SharedModule {

}
