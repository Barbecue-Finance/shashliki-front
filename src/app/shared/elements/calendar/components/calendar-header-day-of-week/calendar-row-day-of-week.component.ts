import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-calendar-row-day-of-week',
  templateUrl: './calendar-row-day-of-week.component.html',
  styleUrls: ['./calendar-row-day-of-week.component.sass']
})
export class CalendarRowDayOfWeekComponent implements OnInit {

  dayOfWeekNames: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  constructor() {
  }

  ngOnInit(): void {
  }

}
