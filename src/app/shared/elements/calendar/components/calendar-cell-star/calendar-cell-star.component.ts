import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-calendar-cell-star',
  templateUrl: './calendar-cell-star.component.html',
  styleUrls: ['./calendar-cell-star.component.sass']
})
export class CalendarCellStarComponent implements OnInit {

  @Input() isInverted: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

}
