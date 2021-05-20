import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.sass']
})
export class ReportComponent implements OnInit {

  @Output() HideEvent = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {
  }

  hide(): void {
    this.HideEvent.emit()
  }
}
