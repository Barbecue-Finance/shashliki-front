import {Component, OnInit} from '@angular/core';
import {CalendarService} from "../../services/calendar.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-calendar-header-title',
  templateUrl: './calendar-header-title.component.html',
  styleUrls: ['./calendar-header-title.component.sass']
})
export class CalendarHeaderTitleComponent implements OnInit {
  title: string = 'This is some test title';

  private _finalize = new Subject();
  readonly months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  constructor(
    private _calendarService: CalendarService
  ) {
  }

  ngOnInit(): void {
    this.fillFromService();
    this._calendarService.onUpdate
      .pipe(takeUntil(this._finalize))
      .subscribe(() => this.onCalendarUpdated())
  }

  private fillFromService(): void {
    this.title = this.months[this._calendarService.monthIndex];
  }

  private onCalendarUpdated(): void {
    this.fillFromService();
  }

}
