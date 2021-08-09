import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IncomeOperationCategory} from "../../../../shared/interfaces/operation-categories/income-operation-category.interface";
import {OutComeOperationCategory} from "../../../../shared/interfaces/operation-categories/outcome-operation-category.interface";
import {Router} from "@angular/router";
import {CategoryService} from "../../services/category.service";
import {OperationCategories} from "../../../../shared/enums/OperationCategory.enum";
import {IncomeOperationCategoryService} from "../../../../shared/services/income-operation-category.service";
import {OutComeOperationCategoryService} from "../../../../shared/services/outcome-operation-category.service";
import {MoneyOperationService} from "../../../../shared/services/money-operation.service";
import {IncomeOutcome} from "../../../../shared/interfaces/income-outcome.interface";
import {Observable} from "rxjs";
import {OutComeMoneyOperation} from "../../../../shared/interfaces/money-operations/outcome-money-operation.interface";
import {IncomeMoneyOperation} from "../../../../shared/interfaces/money-operations/income-money-operation.interface";

@Component({
  selector: 'detailed-operation',
  templateUrl: './detailed-operation.component.html',
  styleUrls: ['./detailed-operation.component.sass']
})
export class DetailedOperationComponent implements OnInit {

  // @ts-ignore
  @Input() openedInfoCategory: Observable<any>

  // @ts-ignore
  @Input() closedInfoCategory: Observable<any>

  @Input() money: number = 0

  @Output() InfoCategoryHidden = new EventEmitter<void>()

  @Input() activeIncomeCategory: { category: IncomeOperationCategory, amount: number } = {
    category: {id: 0, purseId: 0, title: ''},
    amount: 0
  }

  @Input() activeOutComeCategory: { category: OutComeOperationCategory, amount: number } = {
    category: {id: 0, purseId: 0, title: ''},
    amount: 0
  }

  incomeOperations: IncomeMoneyOperation[] = []
  outcomeOperations: OutComeMoneyOperation[] = []

  incomeOutcome: IncomeOutcome = {incoming: [], outComing: []}

  constructor(
    private _router: Router,
    private _categoryService: CategoryService,
    private _incomeService: IncomeOperationCategoryService,
    private _outcomeService: OutComeOperationCategoryService,
    private _moneyService: MoneyOperationService
  ) {
  }

  ngOnInit(): void {
    this.openedInfoCategory.subscribe(() => {
      this.load()
    })
    this.closedInfoCategory.subscribe(() => {
      this.hideInfoCategory()
    })
  }

  filterMoneyOperations(): void {
    this.incomeOperations = this.incomeOutcome.incoming.filter(i => i.incomeOperationCategoryId == this.activeIncomeCategory.category.id)
    this.outcomeOperations = this.incomeOutcome.outComing.filter(i => i.outComeOperationCategoryId == this.activeOutComeCategory.category.id)

    console.table(this.incomeOperations)
    console.table(this.outcomeOperations)
  }

  hideInfoCategory() {
    this._categoryService.killActiveCategory()

    this.InfoCategoryHidden.emit()
  }

  isExpense(): boolean {
    // console.log(this._categoryService.openedCategoryType == OperationCategories.OutcomeOperation)
    return this._categoryService.openedCategoryType == OperationCategories.OutcomeOperation
  }

  isIncome(): boolean {
    // console.log(this._categoryService.openedCategoryType == OperationCategories.IncomeOperation)
    return this._categoryService.openedCategoryType == OperationCategories.IncomeOperation
  }

  private load() {
    if (this._categoryService.isAnyCategoryOpened()) {
      if (this.isIncome()) {
        console.log('Income category')
        console.log(this.activeIncomeCategory)
        this._moneyService
          .getByPurse(this.activeIncomeCategory.category.purseId)
          .subscribe(io => {
            this.incomeOutcome = io
            this.filterMoneyOperations()
          });
      } else {
        console.log('Expense category')
        console.log(this.activeOutComeCategory)
        this._moneyService
          .getByPurse(this.activeOutComeCategory.category.purseId)
          .subscribe(io => {
            this.incomeOutcome = io
            this.filterMoneyOperations()
          });
      }
    }
  }
}
