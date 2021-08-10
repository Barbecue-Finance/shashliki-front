import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-calendar-row',
  templateUrl: './calendar-row.component.html',
  styleUrls: ['./calendar-row.component.sass']
})
export class CalendarRowComponent implements OnInit {

  @Input() rowIndex: number = 0;

  constructor() {
  }

  ngOnInit(): void {
  }

}
