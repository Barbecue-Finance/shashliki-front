import {Component, OnInit, ViewChild} from '@angular/core';
import GroupDto from "../../../../shared/interfaces/group.interface";
import {GroupService} from "../../services/group.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PurseService} from 'src/app/shared/services/purse.service';
import {IncomeOutcome} from 'src/app/shared/interfaces/income-outcome.interface';
import {MoneyOperationService} from 'src/app/shared/services/money-operation.service';
import {IncomeOperationCategoryService} from 'src/app/shared/services/income-operation-category.service';
import {Purse} from 'src/app/shared/interfaces/purse.interface';
import {OutComeOperationCategory} from 'src/app/shared/interfaces/operation-categories/outcome-operation-category.interface';
import {IncomeOperationCategory} from 'src/app/shared/interfaces/operation-categories/income-operation-category.interface';
import {CalendarService} from 'src/app/shared/services/calendar.service';
import {Subject} from 'rxjs';
import {CategoryService} from "../../services/category.service";
import {MoneyPipe} from "../../../../shared/pipes/money.pipe";
import {OperationCategories} from "../../../../shared/enums/OperationCategory.enum";
import {UserService} from "../../../../shared/services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'single-group',
  templateUrl: './single-group.component.html',
  styleUrls: ['./single-group.component.sass']
})
export class SingleGroupComponent implements OnInit {

  private calendarString: string

  isHiddenReport = true
  isHiddenInfoCategory = true

  group?: GroupDto

  openedReport: Subject<void> = new Subject<void>()
  closedReport: Subject<void> = new Subject<void>()

  openedInfoCategory: Subject<void> = new Subject<void>()
  closedInfoCategory: Subject<void> = new Subject<void>()

  selectedIncomeCategory: { category: IncomeOperationCategory, amount: number } = {
    category: {id: 0, title: '', purseId: 0},
    amount: 0
  }

  selectedOutComeCategory: { category: OutComeOperationCategory, amount: number } = {
    category: {id: 0, title: '', purseId: 0},
    amount: 0
  }

  incomeOutcome: IncomeOutcome = {incoming: [], outComing: []}
  purse: Purse = {
    id: 0,
    amount: 0,
    incomeOperationCategories: [],
    outComeOperationCategories: []
  }

  allIncomeCategories: IncomeOperationCategory[] = []
  allOutComeCategories: OutComeOperationCategory[] = []

  dataForInfoCategory: { title: string, letters: string, money: number } = {
    title: '',
    letters: '',
    money: 0
  }

  constructor(
    private _groupsService: GroupService,
    readonly matSnackBar: MatSnackBar,
    private _userService: UserService,
    private _purseService: PurseService,
    private _moneyOperationService: MoneyOperationService,
    private _calendarService: CalendarService,
    private _categoryService: CategoryService,
    private _operationCategoryService: IncomeOperationCategoryService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _moneyPipe: MoneyPipe
  ) {
    this.group = {
      id: 0,
      title: '',
      users: []
    }
    this.calendarString = ''
  }


  ngOnInit(): void {
    let isValid = true
    this._route.params.subscribe(params => {
      isValid = !isNaN(+params['id'])
      if (!isValid) {
        this._router.navigate(['groups'])
      }
    })


    if (!this._groupsService.isAnyGroupOpened()) {
      this._router.navigate(['groups'])
    }

    this._groupsService.getById(this._groupsService.openedGroupId)
      .subscribe((group: GroupDto) => {
        this.group = group
        this._purseService.getByGroup(this.group.id).subscribe(p => {

          this.purse = p
          this.allIncomeCategories = p.incomeOperationCategories
          this.allOutComeCategories = p.outComeOperationCategories

          this._moneyOperationService.getByPurse(p.id).subscribe(io => {
            this.incomeOutcome = io
            this.fillForDay(new Date())

            this.fillDaysOfInterest(new Date());
            this._calendarService.loadCalendar(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
            this._calendarService.dateChanged.subscribe(date => this.fillForDay(date));
          })
        })
      })
    this.loadCalendarString()
  }

  getMonthDays(year: number, month: number): number {
    let isLeapYear = ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0);

    return [31, (isLeapYear ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
  }

  fillDaysOfInterest(date: Date): void {
    let daysOfInterest: number[] = []

    let monthDays = this.getMonthDays(date.getFullYear(), date.getMonth());
    for (let i = 0; i < monthDays; i++) {
      let start = new Date(new Date().getFullYear(), date.getMonth(), i);
      let end = new Date(new Date().getFullYear(), date.getMonth(), i + 1);
      let totalIncomesInADay = this.allIncomeCategories
        .map(c => this.getTotalIncomeByCategory(c.id, start, end))
        .reduce((total, current) => total + current, 0);
      let totalOutComesInADay = this.allOutComeCategories
        .map(c => this.getTotalExpenseByCategory(c.id, start, end))
        .reduce((total, current) => total + current, 0);

      if (totalIncomesInADay + totalOutComesInADay !== 0) {
        daysOfInterest.push(i)
      }
    }
    console.log(`fillDaysOfInterest(): daysOfInterest: ${daysOfInterest}`)
    this._calendarService.daysOfInterest = daysOfInterest
    this._calendarService.redraw();
  }

  fillForMonth(date: Date) {
    this.fillForRange(this.truncateTime(date), this.truncateTime(this.addMonth(date)))

  }

  fillForDay(day: Date) {
    this.fillForRange(this.truncateTime(day), this.truncateTime(this.addDay(day)))
  }

  // This is some weird function to convert C# DateTime format into JS Date
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

  // function to fill displayData for specific time range
  fillForRange(startDate: Date, endDate: Date) {
    console.log(`fillForRange(${this.dateToString(startDate)} - ${this.dateToString(endDate)})`)

    // select only suitable incomes
    let usefulIncomes = this.incomeOutcome.incoming
      .filter(o => this.parseNetDate(o.dateTime) >= startDate && this.parseNetDate(o.dateTime) <= endDate)

    // select only suitable outcomes
    let usefulOutcomes = this.incomeOutcome.outComing
      .filter(o => this.parseNetDate(o.dateTime) >= startDate && this.parseNetDate(o.dateTime) <= endDate)

    // calculate total income
    let totalIncome =
      usefulIncomes
        .map(o => o.amount)
        .reduce((total, current) => total + current, 0)

    // calculate total outcome
    let totalOutCome =
      usefulOutcomes
        .map(o => o.amount)
        .reduce((total, current) => total + current, 0)

    let incomeExpensePerMonth: { income: number, outcome: number }[] = []

    // fill incomes and comes grouped by monthes (passed to report)
    for (let i = 0; i < 12; i++) {
      let start = new Date(new Date().getFullYear(), i, 0);
      let end = new Date(new Date().getFullYear(), i + 1, 0);
      incomeExpensePerMonth.push({
        income: this.allIncomeCategories
          .map(c => this.getTotalIncomeByCategory(c.id, start, end))
          .reduce((total, current) => total + current, 0),
        outcome: this.allOutComeCategories
          .map(c => this.getTotalExpenseByCategory(c.id, start, end))
          .reduce((total, current) => total + current, 0)
      });
    }

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
      incomeExpensePerMonth: incomeExpensePerMonth
    }
  }

  getMembersString(): string {
    let endSym = this.group?.users.length ?? 0 % 10

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

    return `${this.group?.users.length} ${word}`
  }

  // return total income for IncomeCategoryId and time range
  getTotalIncomeByCategory(id: number, startDate: Date, endDate: Date): number {
    return this.incomeOutcome.incoming.length > 0 ?
      this.incomeOutcome.incoming
        .filter(i => i.incomeOperationCategoryId == id && this.parseNetDate(i.dateTime) >= startDate && this.parseNetDate(i.dateTime) <= endDate)
        .map(c => c.amount)
        .reduce((total, current) => total + current, 0)
      : 0
  }

  // return total income for OutComeCategoryId and time range
  getTotalExpenseByCategory(id: number, startDate: Date, endDate: Date): number {
    return this.incomeOutcome.outComing.length > 0 ?
      this.incomeOutcome.outComing
        .filter(i => i.outComeOperationCategoryId == id && this.parseNetDate(i.dateTime) >= startDate && this.parseNetDate(i.dateTime) <= endDate)
        .map(c => c.amount)
        .reduce((total, current) => total + current, 0)
      : 0
  }

  openReport(): void {
    this.isHiddenReport = false
    this.openedReport.next()
  }

  hideReport(): void {
    this.isHiddenReport = true
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

  // function returns true if there is any income or outcome on selected date, otherwise false
  hasOperationsAtDate(date: Date): boolean {
    return (this.incomeOutcome.incoming.findIndex(o =>
      this.parseNetDate(o.dateTime) > date &&
      this.parseNetDate(o.dateTime) < this.addDay(date)
      ) != -1) ||
      (this.incomeOutcome.outComing.findIndex(o =>
        this.parseNetDate(o.dateTime) > date &&
        this.parseNetDate(o.dateTime) < this.addDay(date)
      ) != -1)
  }

  // pretty date string
  dateToString(date: Date): string {
    return `${date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()}.${date.getMonth() >= 10 ? date.getMonth() : '0' + date.getMonth()}.${date.getFullYear()}`
  }

  // truncates date time (05.05.2021 17:30:54 -> 05.05.2021 00:00:00)
  truncateTime(date: Date): Date {
    let nDate = new Date(date)
    nDate.setHours(0, 0, 0)
    return nDate
  }

  // adds a single day to date (05.05.2021 -> 06.05.2021)
  addDay(date: Date): Date {
    let nDate = new Date(date)
    nDate.setDate(nDate.getDate() + 1)
    return nDate
  }

  // adds a single month to date (05.05.2021 -> 05.06.2021)
  addMonth(date: Date): Date {
    let nDate = new Date(date)
    nDate.setMonth(nDate.getMonth() + 1)
    return nDate
  }

  showInfoCategoryIncome(selectedIncomeCategory: { category: IncomeOperationCategory, amount: number }) {
    this.selectedIncomeCategory = selectedIncomeCategory

    this.isHiddenInfoCategory = false

    console.log(this.selectedIncomeCategory)

    this._categoryService.openedCategoryId = selectedIncomeCategory.category.id
    this._categoryService.openedCategoryType = OperationCategories.IncomeOperation

    this.openedInfoCategory.next()
  }

  showInfoCategoryOutcome(selectedOutComeCategory: { category: OutComeOperationCategory, amount: number }) {

    this.selectedOutComeCategory = selectedOutComeCategory
    this.isHiddenInfoCategory = false

    console.log(this.selectedOutComeCategory)

    this._categoryService.openedCategoryId = selectedOutComeCategory.category.id
    this._categoryService.openedCategoryType = OperationCategories.OutcomeOperation

    this.openedInfoCategory.next()
  }

  closeInfoCategory() {
    this.isHiddenInfoCategory = true
  }

  membersClicked() {
    this.matSnackBar.open(
      `В группе '${this.group?.title}' с вами ${this.getMembersString()}: ${this.group?.users.map(u => u.username).join("\n")}`, '',
      {
        duration: 3000
      }
    )
  }

  openCreateOperationPage(): void {
    this._router.navigate(['groups', 'create-operation'])
  }
}
