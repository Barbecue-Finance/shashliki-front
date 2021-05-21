import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {IncomeOperationCategory} from "../../../../shared/interfaces/operation-categories/income-operation-category.interface";
import {OutcomeOperationCategory} from "../../../../shared/interfaces/operation-categories/outcome-operation-category.interface";
import {Router} from "@angular/router";
import {CategoryService} from "../../services/category.service";
import {OperationCategory} from "../../../../shared/interfaces/operation-categories/operation-category.interface";
import {OperationCategories} from "../../../../shared/enums/OperationCategory.enum";
import {IncomeOperationCategoryService} from "../../../../shared/services/income-operation-category.service";
import {OutComeOperationCategoryService} from "../../../../shared/services/outcome-operation-category.service";
import {MoneyOperationService} from "../../../../shared/services/money-operation.service";
import {IncomeOutcome} from "../../../../shared/interfaces/income-outcome.interface";
import {MoneyOperation} from "../../../../shared/interfaces/money-operations/money-operation.interface";
import {Observable} from "rxjs";

@Component({
  selector: 'app-info-category',
  templateUrl: './info.category.component.html',
  styleUrls: ['./info.category.component.sass']
})
export class InfoCategoryComponent implements OnInit {

  // @ts-ignore
  @Input() openedInfoCategory: Observable<any>
  // @ts-ignore
  @Input() closedInfoCategory: Observable<any>

  @Input() title: string = ''
  @Input() letters: string = ''
  @Input() moneyAmountStr: string = ''

  @Output() InfoCategoryHidden = new EventEmitter<void>()

  activeCategory: OperationCategory = {
    id: 0,
    purseId: 0,
    title: ''
  }

  operations: MoneyOperation[] = []

  constructor(
    private _router: Router,
    private _categoryService: CategoryService,
    private _incomeService: IncomeOperationCategoryService,
    private _outcomeService: OutComeOperationCategoryService,
    private _moneyService: MoneyOperationService
  ) {
  }

  ngOnInit(): void {
    if (!this._categoryService.isAnyCategoryOpened()) {
      this._router.navigate(['/groups'])
    }

    this.loadActiveCategory()

    this.loadRelativeMoneyOperations()

    this.loadLetters()
    this.loadTitle()
    this.loadMoneyAmount()
  }

  private loadLetters(): void {
    this.letters = this.activeCategory.title.substring(0, 2)
  }

  private loadTitle(): void {
    this.title = this.activeCategory.title
  }

  private loadMoneyAmount() {
    //  categoryItem.amount | money
  }

  private loadActiveCategory() {
    if (this._categoryService.openedCategoryType == OperationCategories.IncomeOperation) {
      this._incomeService.getById(this._categoryService.openedCategoryId)
        .subscribe((response: IncomeOperationCategory) => {
          this.activeCategory = response
        })
    } else {
      this._outcomeService.getById(this._categoryService.openedCategoryId)
        .subscribe((response: OutcomeOperationCategory) => {
          this.activeCategory = response
        })
    }
  }

  private loadRelativeMoneyOperations() {
    this._moneyService.getByPurse(this.activeCategory.purseId)
      .subscribe((response: IncomeOutcome) => {
        this.filterMoneyOperations(response)
      })
  }

  private filterMoneyOperations(operations: IncomeOutcome) {
    if (this._categoryService.openedCategoryType == OperationCategories.IncomeOperation) {

      this.operations = operations.incoming.filter(i => i.incomeOperationCategoryId == this.activeCategory.id)

    } else {

      this.operations = operations.outComing.filter(i => i.outComeOperationCategoryId == this.activeCategory.id)

    }
  }
}
