import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IncomeOperationCategory} from "../../../../shared/interfaces/operation-categories/income-operation-category.interface";
import {OutcomeOperationCategory} from "../../../../shared/interfaces/operation-categories/outcome-operation-category.interface";
import {Router} from "@angular/router";
import {OperationCategories} from "../../../../shared/enums/OperationCategory.enum";
import {IncomeOperationCategoryService} from "../../services/income-operation-category.service";
import {OutcomeOperationCategoryService} from "../../services/outcome-operation-category.service";
import {MoneyOperationService} from "../../services/money-operation.service";
import {IncomeOutcomeDto} from "../../../../shared/interfaces/dto/income-outcome-dto.interface";
import {Observable} from "rxjs";
import {OutcomeMoneyOperation} from "../../../../shared/interfaces/money-operations/outcome-money-operation.interface";
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

  @Input() activeOutComeCategory: { category: OutcomeOperationCategory, amount: number } = {
    category: {id: 0, purseId: 0, title: ''},
    amount: 0
  }

  incomeOperations: IncomeMoneyOperation[] = []
  outcomeOperations: OutcomeMoneyOperation[] = []

  incomeOutcome: IncomeOutcomeDto = {incoming: [], outcoming: []}

  constructor(
    private _router: Router,
    private _incomeService: IncomeOperationCategoryService,
    private _outcomeService: OutcomeOperationCategoryService,
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
    this.outcomeOperations = this.incomeOutcome.outcoming.filter(i => i.outComeOperationCategoryId == this.activeOutComeCategory.category.id)

    console.table(this.incomeOperations)
    console.table(this.outcomeOperations)
  }

  hideInfoCategory() {
    this.InfoCategoryHidden.emit()
  }

  isExpense(): boolean {
    // console.log(this._categoryService.openedCategoryType == OperationCategories.OutcomeOperation)
    // return this._categoryService.openedCategoryType == OperationCategories.OutcomeOperation
    return false;
  }

  isIncome(): boolean {
    // console.log(this._categoryService.openedCategoryType == OperationCategories.IncomeOperation)
    // return this._categoryService.openedCategoryType == OperationCategories.IncomeOperation
    return false;
  }

  private load() {
    // if (this._categoryService.isAnyCategoryOpened()) {
    //   if (this.isIncome()) {
    //     console.log('Income category')
    //     console.log(this.activeIncomeCategory)
    //     this._moneyService
    //       .getByPurse(this.activeIncomeCategory.category.purseId)
    //       .subscribe(io => {
    //         this.incomeOutcome = io
    //         this.filterMoneyOperations()
    //       });
    //   } else {
    //     console.log('Expense category')
    //     console.log(this.activeOutComeCategory)
    //     this._moneyService
    //       .getByPurse(this.activeOutComeCategory.category.purseId)
    //       .subscribe(io => {
    //         this.incomeOutcome = io
    //         this.filterMoneyOperations()
    //       });
    //   }
    // }
  }
}
