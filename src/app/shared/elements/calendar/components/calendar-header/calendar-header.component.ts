import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.sass']
})
export class CalendarHeaderComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  handlePreviousMonthClick() {
    // TODO: Call service to switch to previous month
  }

  handleNextMonthClick() {
    // TODO: Call service to switch to next month
  }
}
