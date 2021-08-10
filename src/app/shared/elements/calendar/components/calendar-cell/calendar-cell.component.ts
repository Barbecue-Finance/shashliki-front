import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-calendar-cell',
  templateUrl: './calendar-cell.component.html',
  styleUrls: ['./calendar-cell.component.sass']
})
export class CalendarCellComponent implements OnInit {
  value: string = '';

  @Input() rowIndex: number = 0;
  @Input() columnIndex: number = 0;

  isDayOfInterest: boolean = true;

  constructor() {
  }

  ngOnInit(): void {
  }

  handleClick() {
    // TODO: Call service with rowIndex and columnIndex
  }
}
