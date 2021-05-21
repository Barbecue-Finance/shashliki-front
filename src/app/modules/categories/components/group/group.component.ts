import {Component, OnInit} from '@angular/core';
import {IGroup} from "../../../../shared/interfaces/group.interface";
import {GroupService} from "../../services/group.service";
import {Router} from "@angular/router";
import {PurseService} from 'src/app/shared/services/purse.service';
import {IncomeOutcome} from 'src/app/shared/interfaces/income-outcome.interface';
import {MoneyOperationService} from 'src/app/shared/services/money-operation.service';
import {IncomeOperationCategoryService} from 'src/app/shared/services/income-operation-category.service';
import {Purse} from 'src/app/shared/interfaces/purse.interface';
import {OutComeOperationCategory} from 'src/app/shared/interfaces/operation-categories/outcome-operation-category.interface';
import {IncomeOperationCategory} from 'src/app/shared/interfaces/operation-categories/income-operation-category.interface';
import {CalendarService} from 'src/app/shared/services/calendar.service';
import {Subject} from 'rxjs';
import {IncomeMoneyOperation} from "../../../../shared/interfaces/money-operations/income-money-operation.interface";
import {OutComeMoneyOperation} from "../../../../shared/interfaces/money-operations/outcome-money-operation.interface";

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

  incomeOutcome: IncomeOutcome = {incoming: [], outComing: []}
  purse: Purse = {
    id: 0,
    amount: 0,
    incomeOperationCategories: [],
    outComeOperationCategories: []
  }

  displayData: {
    totalIncome: number,
    totalOutCome: number,
    totalAmount: number
    incomeCategories: { category: IncomeOperationCategory, amount: number }[],
    outcomeCategories: { category: OutComeOperationCategory, amount: number }[],
    date: string,
  } = {
    totalIncome: 0,
    totalOutCome: 0,
    totalAmount: 0,
    incomeCategories: [],
    outcomeCategories: [],
    date: '',
  }

  allIncomeCategories: IncomeOperationCategory[] = []
  allOutComeCategories: OutComeOperationCategory[] = []

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

          this.purse = p
          this.allIncomeCategories = p.incomeOperationCategories
          this.allOutComeCategories = p.outComeOperationCategories

          this._moneyOperationService.getByPurse(p.id).subscribe(io => {
            this.incomeOutcome = io
            console.table(this.incomeOutcome.incoming)
            console.table(this.incomeOutcome.outComing)
            this.fillForDay(new Date())
          })
        })
      })

    this._calendarService.loadCalendar(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    this.loadCalendarString()
  }

  fillForMonth(date: Date) {
    this.fillForRange(this.truncateTime(date), this.truncateTime(this.addMonth(date)))
  }

  fillForDay(day: Date) {
    this.fillForRange(this.truncateTime(day), this.truncateTime(this.addDay(day)))
  }

  parseNetDate(cSDate: string): Date {
    // cSDate is '2017-01-24T14:14:55.807'
    let datestr = cSDate.toString();
    let dateAr = datestr.split('-');
    let year = parseInt(dateAr[0]);
    let month = parseInt(dateAr[1]) - 1;
    let day = parseInt(dateAr[2].substring(0, dateAr[2].indexOf("T")));
    let timestring = dateAr[2].substring(dateAr[2].indexOf("T") + 1);
    let timeAr = timestring.split(":");
    let hour = parseInt(timeAr[0]);
    let min = parseInt(timeAr[1]);
    let sek = parseInt(timeAr[2]);
    let date = new Date(year, month, day, hour, min, sek, 0);
    return date;
  }

  fillForRange(startDate: Date, endDate: Date) {

    console.log(`fillForRange(${this.dateToString(startDate)} - ${this.dateToString(endDate)})`)

    let usefulIncomes = this.incomeOutcome.incoming
      .filter(o => this.parseNetDate(o.dateTime) >= startDate && this.parseNetDate(o.dateTime) <= endDate)

    let usefulOutcomes = this.incomeOutcome.outComing
      .filter(o => this.parseNetDate(o.dateTime) >= startDate && this.parseNetDate(o.dateTime) <= endDate)

    let totalIncome =
      usefulIncomes
        .map(o => o.amount)
        .reduce((total, current) => total + current, 0)
    let totalOutCome =
      usefulOutcomes
        .map(o => o.amount)
        .reduce((total, current) => total + current, 0)

    this.displayData = {
      date: `${this.dateToString(this.addMonth(startDate))} - ${this.dateToString(this.addMonth(endDate))}`,
      totalIncome: totalIncome,
      totalOutCome: totalOutCome,
      totalAmount: totalIncome - totalOutCome,
      incomeCategories: this.allIncomeCategories
        .filter(c => usefulIncomes
          .findIndex(i => i.incomeOperationCategoryId === c.id) != -1)
        .map(c =>
          ({
            category: c,
            amount: this.getTotalIncomeByCategory(c.id, startDate, endDate)
          })
        ),
      outcomeCategories: this.allOutComeCategories
        .filter(c => usefulOutcomes
          .findIndex(i => i.outComeOperationCategoryId === c.id) != -1)
        .map(c =>
          ({
            category: c,
            amount: this.getTotalExpenseByCategory(c.id, startDate, endDate)
          })
        ),
    }
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

  getTotalIncomeByCategory(id: number, startDate: Date, endDate: Date): number {
    return this.incomeOutcome.incoming.length > 0 ?
      this.incomeOutcome.incoming
        .filter(i => i.incomeOperationCategoryId == id && this.parseNetDate(i.dateTime) >= startDate && this.parseNetDate(i.dateTime) <= endDate)
        .map(c => c.amount)
        .reduce((total, current) => total + current, 0)
      : 0
  }

  getTotalExpenseByCategory(id: number, startDate: Date, endDate: Date): number {
    return this.incomeOutcome.outComing.length > 0 ?
      this.incomeOutcome.outComing
        .filter(i => i.outComeOperationCategoryId == id && this.parseNetDate(i.dateTime) >= startDate && this.parseNetDate(i.dateTime) <= endDate)
        .map(c => c.amount)
        .reduce((total, current) => total + current, 0)
      : 0
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
    console.log(this.calendarString)
  }

  // hasOperationsAtDate(date: Date) {
  //   return (this.incomeOutcome.incoming.findIndex(o =>
  //     o.dateTime > date &&
  //     o.dateTime < this.addDay(date)
  //     ) != -1) ||
  //     (this.incomeOutcome.outComing.findIndex(o =>
  //       o.dateTime > date &&
  //       o.dateTime < this.addDay(date)
  //     ) != -1)
  // }

  dateToString(date: Date): string {
    return `${date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()}.${date.getMonth() >= 10 ? date.getMonth() : '0' + date.getMonth()}.${date.getFullYear()}`
  }

  truncateTime(date: Date): Date {
    let nDate = new Date(date)
    nDate.setHours(0, 0, 0)
    return nDate
  }

  addDay(date: Date): Date {
    let nDate = new Date(date)
    nDate.setDate(nDate.getDate() + 1)
    return nDate
  }

  addMonth(date: Date): Date {
    let nDate = new Date(date)
    nDate.setMonth(nDate.getMonth() + 1)
    return nDate
  }

  compareDates(date1: Date, date2: Date): number {
    return this.compareYear(date1, date2)
  }

  compareYear(date1: Date, date2: Date): number {
    let result = this.compare(date1.getFullYear(), date2.getFullYear())
    if (result == 0) {
      return this.compareMonth(date1, date2);
    }
    return result
  }

  compareMonth(date1: Date, date2: Date): number {
    let result = this.compare(date1.getMonth(), date2.getMonth())
    if (result == 0) {
      return this.compareDate(date1, date2);
    }
    return result
  }

  compareDate(date1: Date, date2: Date): number {
    return this.compare(date1.getDate(), date2.getDate())
  }

  compare(n1: number, n2: number): number {
    if (n1 < n2) return -1
    else if (n1 > n2) return 1
    else return 0
  }
}
