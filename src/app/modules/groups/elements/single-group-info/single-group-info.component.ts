import {Component, OnInit} from '@angular/core';
import {GroupService} from "../../services/group.service";
import {OutcomeCategory} from "../../interfaces/outcome-category.interface";
import {IncomeCategory} from "../../interfaces/income-category.interface";
import GroupDto from "../../../../shared/interfaces/group.interface";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {PurseService} from "../../services/purse.service";
import {zip} from "rxjs";
import {MoneyOperationService} from "../../services/money-operation.service";
import {IncomeOperationCategoryService} from "../../services/income-operation-category.service";
import {OutcomeOperationCategoryService} from "../../services/outcome-operation-category.service";

@Component({
  selector: 'single-group-info',
  templateUrl: './single-group-info.component.html',
  styleUrls: ['./single-group-info.component.sass']
})
export class SingleGroupInfoComponent implements OnInit {

  //#region Fields

  date = '';
  title = '';
  totalOutcome = 0;
  totalIncome = 0;
  outcomeCategories: OutcomeCategory[] = [];
  incomeCategories: IncomeCategory[] = [];
  totalAmount = 0;
  private group!: GroupDto;

  isLoaded = false;

  //#endregion

  //#region constructor

  constructor(
    private _groupService: GroupService,
    private _purseService: PurseService,
    private _moneyOperationService: MoneyOperationService,
    private _incomeOperationCategoryService: IncomeOperationCategoryService,
    private _outcomeOperationCategoryService: OutcomeOperationCategoryService,
    private matSnackBar: MatSnackBar,
    private _router: Router
  ) {
  }

  //#endregion

  ngOnInit(): void {
    this._groupService.loadOpenedGroup().subscribe(() => {
      zip(
        this._moneyOperationService.loadCurrentPurseOperations(),
        this._purseService.loadCurrentPurse(),
        this._incomeOperationCategoryService.loadCurrentIncomeOperationCategories(),
        this._outcomeOperationCategoryService.loadCurrentOutcomeOperationCategories()
      )
        .subscribe(() => {
          this.loadDisplayItems();
          this.isLoaded = true;
        })
    })
  }


  private loadDisplayItems(): void {
    this.group = this._groupService.group;

    this.date =

    this.title = this._groupService.group.title;

    this.totalOutcome = this._moneyOperationService.currentPurseOperations.outcoming
      .map(o => o.amount)
      .reduce((accumulator, current) => accumulator + current, 0)

    this.totalIncome = this._moneyOperationService.currentPurseOperations.incoming
      .map(o => o.amount)
      .reduce((accumulator, current) => accumulator + current, 0)

    this.outcomeCategories = this._outcomeOperationCategoryService.currentOutcomeOperationCategories
      .map(c => {
        return {
          category: c,
          amount: this.getTotalOutcomeByCategory(c.id)
        } as OutcomeCategory;
      });

    this.incomeCategories = this._incomeOperationCategoryService.currentIncomeOperationCategories
      .map(c => {
        return {
          category: c,
          amount: this.getTotalIncomeByCategory(c.id)
        } as IncomeCategory;
      });

    this.totalAmount = this.totalIncome - this.totalOutcome;
  }

  getTotalIncomeByCategory(id: number /*, startDate: Date, endDate: Date*/): number {
    return this._moneyOperationService.currentPurseOperations.incoming.length > 0 ?
      this._moneyOperationService.currentPurseOperations.incoming
        .filter(i => i.incomeOperationCategoryId == id
          // && this.parseNetDate(i.dateTime) >= startDate && this.parseNetDate(i.dateTime) <= endDate
        )
        .map(c => c.amount)
        .reduce((total, current) => total + current, 0)
      : 0
  }

  // return total income for OutComeCategoryId and time range
  getTotalOutcomeByCategory(id: number/*, startDate: Date, endDate: Date*/): number {
    return this._moneyOperationService.currentPurseOperations.outcoming.length > 0 ?
      this._moneyOperationService.currentPurseOperations.outcoming
        .filter(i => i.outComeOperationCategoryId == id
          // && this.parseNetDate(i.dateTime) >= startDate && this.parseNetDate(i.dateTime) <= endDate
        )
        .map(c => c.amount)
        .reduce((total, current) => total + current, 0)
      : 0
  }

  membersClicked(): void {
    this.matSnackBar.open(
      `В группе '${this.group?.title}' с вами ${this.getMembersString()}: ${this.group?.users.map(u => u.username).join("\n")}`, '',
      {
        duration: 3000
      }
    )
  }

  getMembersString(): string {
    let endSym = this.group.users.length ?? 0 % 10

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

  openCreateOperationPage(): void {
    this._router.navigate(['groups', 'create-operation'])
  }

  showInfoCategoryOutcome(category: OutcomeCategory): void {
  }

  showInfoCategoryIncome(category: IncomeCategory): void {
  }
}
