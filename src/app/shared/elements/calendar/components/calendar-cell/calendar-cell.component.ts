import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CalendarService} from "../../services/calendar.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-calendar-cell',
  templateUrl: './calendar-cell.component.html',
  styleUrls: ['./calendar-cell.component.sass']
})
export class CalendarCellComponent implements OnInit, OnDestroy {
  value: string = '';

  @Input() rowIndex: number = 0;
  @Input() columnIndex: number = 0;

  isDayOfInterest: boolean = true;
  isSelected: boolean = false;

  private _finalize = new Subject();

  constructor(
    private _calendarService: CalendarService
  ) {
  }

  ngOnInit(): void {
    // TODO: fill isSelected so the star can be properly inverted

    this.fillFromService();

    this._calendarService.onUpdate
      .pipe(takeUntil(this._finalize))
      .subscribe(() => this.onCalendarUpdated())
  }

  private fillFromService(): void {
    let day = this._calendarService.getDayByTableIndex(this.rowIndex, this.columnIndex);
    this.value = day === 0 ? '' : day.toString();
    this.isSelected = this._calendarService.isSelected(this.rowIndex, this.columnIndex);
    this.isDayOfInterest = this._calendarService.isDayOfInterest(this.rowIndex, this.columnIndex);
  }

  private onCalendarUpdated() {
    this.fillFromService();
  }

  handleClick() {
    this._calendarService.cellClicked(this.rowIndex, this.columnIndex);
  }

  ngOnDestroy(): void {
    this._finalize.next();
    this._finalize.complete();
  }
}
