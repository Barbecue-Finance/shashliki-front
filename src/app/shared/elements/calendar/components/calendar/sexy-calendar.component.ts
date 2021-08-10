import {Component, OnInit} from '@angular/core';
import {CalendarService} from "../../services/calendar.service";

@Component({
  selector: 'app-sexy-calendar',
  templateUrl: './sexy-calendar.component.html',
  styleUrls: ['./sexy-calendar.component.sass']
})
export class SexyCalendarComponent implements OnInit {

  constructor(
    private _calendarService: CalendarService
  ) {
  }

  ngOnInit(): void {
  }
}
