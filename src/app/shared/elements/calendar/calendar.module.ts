import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SexyCalendarComponent} from "./components/calendar/sexy-calendar.component";
import {CalendarCellComponent} from "./components/calendar-cell/calendar-cell.component";
import {CalendarCellStarComponent} from "./components/calendar-cell-star/calendar-cell-star.component";
import {CalendarRowComponent} from "./components/calendar-row/calendar-row.component";
import {CalendarButtonComponent} from './components/calendar-button/calendar-button.component';
import {CalendarRowDayOfWeekComponent} from './components/calendar-header-day-of-week/calendar-row-day-of-week.component';
import {CalendarHeaderComponent} from "./components/calendar-header/calendar-header.component";
import {CalendarHeaderTitleComponent} from "./components/calendar-header-title/calendar-header-title.component";


@NgModule({
  declarations: [
    SexyCalendarComponent,
    CalendarCellComponent,
    CalendarCellStarComponent,
    CalendarRowComponent,
    CalendarButtonComponent,
    CalendarRowDayOfWeekComponent,
    CalendarHeaderComponent,
    CalendarHeaderTitleComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SexyCalendarComponent
  ]
})
export class CalendarModule {
}
