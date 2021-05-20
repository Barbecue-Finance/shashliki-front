import { Component, OnInit } from '@angular/core';
import { IGroup } from "../../../../shared/interfaces/group.interface";
import { GroupService } from "../../services/group.service";
import { Router } from "@angular/router";
import { PurseService } from 'src/app/shared/services/purse.service';
import { IncomeOutcome } from 'src/app/shared/interfaces/income-outcome.interface';
import { MoneyOperationService } from 'src/app/shared/services/money-operation.service';
import { IncomeOperationCategoryService } from 'src/app/shared/services/income-operation-category.service';
import { Purse } from 'src/app/shared/interfaces/purse.interface';
import { OutComeOperationCategory } from 'src/app/shared/interfaces/operation-categories/outcome-operation-category.interface';
import { IncomeOperationCategory } from 'src/app/shared/interfaces/operation-categories/income-operation-category.interface';
import { CalendarService } from 'src/app/shared/services/calendar.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.sass']
})
export class GroupComponent implements OnInit {
  
  private calendarString: string

  isHidden = true

  group: IGroup

  openedReport: Subject<void> = new Subject<void>()
  closedReport: Subject<void> = new Subject<void>()

  incomeOutcome: IncomeOutcome = { incoming: [], outComing: [] }
  purse: Purse = {
    id: 0,
    amount: 0,
    incomeOperationCategories: [],
    outComeOperationCategories: []
  }
  incomeCategories: IncomeOperationCategory[] = []
  outComeCategories: OutComeOperationCategory[] = []
  finalOutcome: number = 0
  finalIncome: number = 0
  finalAmount: number = 0
  
  constructor(
    private _groupsService: GroupService,
    private _purseService: PurseService,
    private _moneyOperationService: MoneyOperationService,
    private _calendarService: CalendarService,
    private _operationCategoryService: IncomeOperationCategoryService,
    private _router: Router
  ) {
    this.group = {
      id: 0,
      title: '',
      users: []
    }
    this.calendarString = ''
  }


  ngOnInit(): void {
    if (!this._groupsService.isAnyGroupOpened()) {
      this._router.navigate(['/groups'])
    }

    this._groupsService.getById(this._groupsService.openedGroupId)
      .subscribe((group: IGroup) => {
        this.group = group
        this._purseService.getByGroup(this.group.id).subscribe(p => {

          console.log(p)

          this.purse = p
          this.incomeCategories = p.incomeOperationCategories
          this.outComeCategories = p.outComeOperationCategories
          
          this.finalAmount = p.amount
          this._moneyOperationService.getByPurse(p.id).subscribe(io => {
            this.incomeOutcome = io
            this.finalOutcome = this.incomeOutcome.outComing.length > 0 ? this.incomeOutcome.outComing.map(op => op.amount).reduce((total, current) => total + current) : 0
            this.finalIncome = this.incomeOutcome.incoming.length > 0 ? this.incomeOutcome.incoming.map(op => op.amount).reduce((total, current) => total + current) : 0
          })
        })
      })
  }

  getMembersString(): string {
    let endSym = this.group.users.length % 10

    let word: string;

    switch (endSym) {
      case 1:
        word = 'участник'
        break

      case 2:
      case 3:
      case 4:
        word = 'участника'
        break

      default:
        word = 'участников'
        break
    }

    return `${this.group.users.length} ${word}`
  }

  getTotalIncomeByCategory(id: number): number {
    console.log(`getTotalIncomeByCategory(${id})`);
    let income = this.incomeOutcome.incoming.length > 0 ? this.incomeOutcome.incoming.filter(i => i.incomeOperationCategoryId == id).map(c => c.amount).reduce((total, current) => total + current, 0) : 0
    return income
  }

  getTotalExpenseByCategory(id: number): number {
    console.log(`getTotalExpenseByCategory(${id})`);
    
    let outcome = this.incomeOutcome.outComing.length > 0 ? this.incomeOutcome.outComing.filter(i => i.outComeOperationCategoryId == id).map(c => c.amount).reduce((total, current) => total + current, 0) : 0
    return outcome
  }  
  
  openReport(): void {
    this.isHidden = false
    this.openedReport.next()
  }

  hideReport(): void {
    this.isHidden = true
    this.closedReport.next()
  }

  get calendar(): string {
    return this.calendarString
  }
  set calendar(newString) {
    this.calendarString = newString
  }

  loadCalendarString(): void {
    this.calendarString = this._calendarService.generatePointDate()
  }
}
