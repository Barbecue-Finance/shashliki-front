import {NgModule} from "@angular/core";

import {CommonModule} from "@angular/common";
import {HeaderComponent} from "../components/header/header.component";
import {CalendarComponent} from "../components/calendar/calendar.component";
import {MoneyPipe} from "../pipes/money.pipe";
import {DataEditComponent} from "../components/inputs/data-edit/data-edit.component";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    HeaderComponent,
    CalendarComponent,
    MoneyPipe,
    DataEditComponent,
  ],

  imports: [
    CommonModule,
    ReactiveFormsModule],

  exports: [
    CommonModule,
    HeaderComponent,
    CalendarComponent,
    MoneyPipe,
    DataEditComponent,
    ReactiveFormsModule,
  ]
})

export class SharedModule {

}
