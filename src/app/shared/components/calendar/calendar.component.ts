import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {CalendarService} from "../../services/calendar.service";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass']
})
export class CalendarComponent implements OnInit {

  @Output() changeDate = new EventEmitter<void>();

  // @ts-ignore
  private _calendarDOM: HTMLElement;

  constructor(
    private _calendarService: CalendarService
  ) {
    // @ts-ignore
    this._calendarDOM = document.querySelector('#calendar')
  }

  ngOnInit(): void {
    this.redraw()
    this._calendarService.redrawRequested.subscribe(() => this.redraw());
  }

  redraw(): void {
    let temp = this._calendarService.init({
      prevNextButton: 'show',
      highlightTargetDate: true,
      highlightToday: true,
      dayFormat: 'full',
      monthFormat: 'full',
      date: 0,
      month: 0,
      year: 0,
      target: '#calendar',
      type: 'month'
    })

    let dom = document.querySelector('#calendar')
    // @ts-ignore
    dom.innerHTML = temp
  }

  processClick(e: MouseEvent): void {
    let target = e.target as HTMLElement


    console.log('Pressed', target.tagName)


    if (target.tagName.toLowerCase() === 'span') {
      this.processSpan(target as HTMLSpanElement);
    } else if (target.tagName.toLowerCase() === 'td') {
      this.processTd(target as HTMLTableDataCellElement)
    }
  }

  processSpan(elem: HTMLSpanElement): void {
    if (!elem.classList.contains('calendar-span-month-year')) {
      let dom = document.querySelector('#calendar')
      // @ts-ignore
      dom.innerHTML = this.moveMonth(elem)
      this.changeDate.next()
    }
  }

  moveMonth(elem: HTMLSpanElement): string {
    if (elem.classList.contains('next-btn')) {
      return this.getNextMonth(elem);
    } else {
      return this.getPrevMonth(elem)
    }
  }

  getNextMonth(elem: HTMLSpanElement): string {
    return this._calendarService.nextMonth(elem)
  }

  getPrevMonth(elem: HTMLSpanElement): string {
    return this._calendarService.prevMonth(elem)
  }

  processTd(elem: HTMLTableDataCellElement): void {
    let value = +(elem.innerText)

    if (!isNaN(value) && value !== 0) {
      this.selectNewActiveDate(elem)
      this.changeDate.next()
    }
  }

  selectNewActiveDate(elem: HTMLTableDataCellElement): void {
    let temp = document.getElementById('calendar')

    // @ts-ignore
    temp.innerHTML = this._calendarService.newActiveDate(elem)
  }
}
