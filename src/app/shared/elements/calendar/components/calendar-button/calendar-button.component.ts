import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-calendar-button',
  templateUrl: './calendar-button.component.html',
  styleUrls: ['./calendar-button.component.sass']
})
export class CalendarButtonComponent implements OnInit {

  @Input() displaySymbol: string = '';
  @Output() clicked: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {
  }

  handleClick(): void {
    this.clicked.emit();
  }

}
