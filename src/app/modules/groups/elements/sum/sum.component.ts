import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'sum-component',
  templateUrl: './sum.component.html',
  styleUrls: ['./sum.component.sass']
})
export class SumComponent implements OnInit {

  @Input() totalAmount!: number;
  @Input() isIncome!: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

}
