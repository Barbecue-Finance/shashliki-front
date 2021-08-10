import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-calendar-header-title',
  templateUrl: './calendar-header-title.component.html',
  styleUrls: ['./calendar-header-title.component.sass']
})
export class CalendarHeaderTitleComponent implements OnInit {
  title: string = 'This is some test title';

  constructor() {
  }

  ngOnInit(): void {
    // TODO: load this.title from service (name of the month)
  }

}
