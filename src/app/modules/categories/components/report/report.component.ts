import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {CalendarService} from "../../../../shared/services/calendar.service";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.sass']
})
export class ReportComponent implements OnInit {

  // @ts-ignore
  private eventSubscription: Subscription

  // @ts-ignore
  @Input() closeReport: Observable<void>
  // @ts-ignore
  @Input() openReport: Observable<void>
  @Output() HideEvent = new EventEmitter<void>();

  @Output() activeMonthChanged = new EventEmitter<number>();

  private _activeMonthId: number
  private _selectedMonthClass: string

  constructor(
    private _calendarService: CalendarService
  ) {
    this._activeMonthId = -1
    this._selectedMonthClass = 'selected-month'
  }

  ngOnInit(): void {
    this.eventSubscription = this.openReport.subscribe(() => this.selectActiveMonth())
    this.eventSubscription = this.closeReport.subscribe(() => this.hide())
  }

  selectActiveMonth(): void {
    this._activeMonthId = this._calendarService.todayMonth
    this.highlightSelectedMonth()
  }

  highlightSelectedMonth(): void {
    let monthWrappers = document.querySelectorAll('.month-wrapper')

    for (let i = 0; i < monthWrappers.length; i++) {
      monthWrappers[i].classList.remove(this._selectedMonthClass)
    }

    monthWrappers[this._activeMonthId].classList.add(this._selectedMonthClass)
  }

  hide(): void {
    this.HideEvent.emit()
  }

  changeMonth(month: number) {
    console.log(`changeMonth(${month})`)
    this._activeMonthId = month - 1
    this.highlightSelectedMonth()
    this.activeMonthChanged.emit(new Date(this._calendarService.todayYear, month - 1, 1))
  }
}
