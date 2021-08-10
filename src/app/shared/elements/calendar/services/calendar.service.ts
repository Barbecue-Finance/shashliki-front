import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  // this field is used to calculate everything, so you just need to provide any date in a month
  private _currentDate!: Date

  // current month first day dayOfWeekOffset
  private _monthDayOfWeekOffset: number = 0;

  // amount of days in current month
  private _daysInMonth: number = 30;

  // zero-based current displayed month
  private _monthIndex: number = 0;

  // event for all cells, to listen on updates
  readonly onUpdate: Subject<void> = new Subject<void>();

  // Don't really need to memorize the selected date since everything is calculated on demand
  private _selectedDay: number = 0;

  constructor() {
    this.setMonthFromDate(new Date());
  }

  get monthIndex(): number {
    return this._monthIndex;
  }

  private static getMonthDayOfWeekOffsetByDate(date: Date): number {
    let offsetDate = new Date(date.getTime());
    offsetDate.setDate(1);
    return CalendarService.transformDayOfWeekToMondayBased(offsetDate.getDay());
  }

  private static getMonthMaxDayByDate(date: Date): number {
    let leftDate = new Date(date.getTime());
    leftDate.setHours(0);
    let rightDate = new Date(leftDate.getTime())
    rightDate.setMonth(rightDate.getMonth() + 1);

    let secondsDelta = rightDate.getTime() - leftDate.getTime();

    // 86400 is amount of seconds in one day

    return ~~(secondsDelta / (86400 * 1000));
  }

  setMonthFromDate(date: Date): void {
    this._currentDate = date;
    this._monthDayOfWeekOffset = CalendarService.getMonthDayOfWeekOffsetByDate(this._currentDate);
    this._daysInMonth = CalendarService.getMonthMaxDayByDate(this._currentDate);
    this._monthIndex = date.getMonth();

    console.log(this)

    this.onUpdate.next();
  }

  moveToPreviousMonth(): void {
    let date = new Date(this._currentDate.getTime());
    date.setMonth(date.getMonth() - 1);
    this.setMonthFromDate(date);
  }

  moveToNextMonth(): void {
    let date = new Date(this._currentDate.getTime());
    date.setMonth(date.getMonth() + 1);
    this.setMonthFromDate(date);
  }

  private transformTableIndicesToMonthDay(rowIndex: number, columnIndex: number): number {
    let index = rowIndex * 7 + columnIndex + 1;

    index -= this._monthDayOfWeekOffset;

    if (index < 0 || index > this._daysInMonth) {
      index = 0;
    }

    return index;
  }

  private static transformDayOfWeekToMondayBased(dayOfWeek: number): number {
    return (dayOfWeek + 7 - 1) % 7;
  }

  getDayByTableIndex(rowIndex: number, columnIndex: number): number {
    return this.transformTableIndicesToMonthDay(rowIndex, columnIndex);
  }

  cellClicked(rowIndex: number, columnIndex: number): void {
    let day = this.getDayByTableIndex(rowIndex, columnIndex);
    if (day === 0) {
      return;
    }

    this._selectedDay = day;
    this.onUpdate.next();
  }

  isSelected(rowIndex: number, columnIndex: number): boolean {
    let day = this.getDayByTableIndex(rowIndex, columnIndex);

    return day !== 0 && day === this._selectedDay;
  }

  isDayOfInterest(rowIndex: number, columnIndex: number): boolean {
    return true;
  }
}


