import {Component, OnInit} from '@angular/core';
import {CalendarService} from "../../services/calendar.service";

@Component({
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.sass']
})
export class CalendarHeaderComponent implements OnInit {

  constructor(
    private _calendarService: CalendarService
  ) {
  }

  ngOnInit(): void {
  }

  handlePreviousMonthClick() {
    this._calendarService.moveToPreviousMonth();
  }

  handleNextMonthClick() {
    this._calendarService.moveToNextMonth();
  }
}
