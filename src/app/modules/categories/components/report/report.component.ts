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
    console.log(this._activeMonthId)

    let elems = document.querySelectorAll('.month-wrapper')

    for (let i = 0; i < 12; ++i) {
      if (i === this._activeMonthId) {
        elems[i].classList.add(this._selectedMonthClass)
        break
      }
    }
  }

  hide(): void {
    this.removeActiveMonth()

    this.HideEvent.emit()
  }

  removeActiveMonth(): void {
    document.querySelectorAll('.month-wrapper')[this._activeMonthId]
      .classList.remove(this._selectedMonthClass)
  }
}
