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
  isSelected: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    // TODO: fill isSelected so the star can be properly inverted
    this.value = '' + (this.rowIndex * 7 + this.columnIndex);
  }

  handleClick() {
    // TODO: Call service with rowIndex and columnIndex
    this.isSelected = !this.isSelected;
  }
}
