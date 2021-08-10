import {Component, EventEmitter, Input, OnInit, Output, SkipSelf} from '@angular/core';
import {IncomeOperationCategory} from "../../../../shared/interfaces/operation-categories/income-operation-category.interface";
import {OutcomeOperationCategory} from "../../../../shared/interfaces/operation-categories/outcome-operation-category.interface";
import {Router} from "@angular/router";
import {OperationCategories} from "../../../../shared/enums/OperationCategory.enum";
import {IncomeOperationCategoryService} from "../../services/income-operation-category.service";
import {OutcomeOperationCategoryService} from "../../services/outcome-operation-category.service";
import {MoneyOperationService} from "../../services/money-operation.service";
import {IncomeOutcomeDto} from "../../../../shared/interfaces/dto/income-outcome-dto.interface";
import {Observable, Subject} from "rxjs";
import {OutcomeMoneyOperation} from "../../../../shared/interfaces/money-operations/outcome-money-operation.interface";
import {IncomeMoneyOperation} from "../../../../shared/interfaces/money-operations/income-money-operation.interface";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {OperationCategory} from "../../../../shared/interfaces/operation-categories/operation-category.interface";
import {CategoryPassService} from "../../services/category-pass.service";
import {CategoryInterface} from "../../interfaces/category.interface";
import {IncomeCategory} from "../../interfaces/income-category.interface";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


@Component({
  selector: 'detailed-category',
  templateUrl: './detailed-category.component.html',
  styleUrls: ['./detailed-category.component.sass']
})
export class DetailedCategoryComponent implements OnInit {

  //#region Table workspace

  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  //#endregion


  openedCategory: CategoryInterface = {
    category: {
      id: 0,
      title: '',
      purseId: 0
    },
    amount: 0
  };

  //#region @Inputs()

  @Input() InfoCategoryOpenedEvent!: Observable<void>;
  @Output() InfoCategoryHiddenEvent = new EventEmitter<void>();

  //#endregion


  //#region constructor(...) { }

  constructor(
    @SkipSelf() private _categoryPassService: CategoryPassService,
    private _router: Router,
    private _incomeService: IncomeOperationCategoryService,
    private _outcomeService: OutcomeOperationCategoryService,
    private _moneyService: MoneyOperationService
  ) {
  }

  //#endregion

  ngOnInit(): void {
    this.InfoCategoryOpenedEvent.subscribe(() => this.load());
  }

  hideInfoCategory() {
    this.InfoCategoryHiddenEvent.emit();
  }

  private load() {
    this.openedCategory = this._categoryPassService.openedCategory;
  }

  getTotalTextColor(): string {
    // return this.openedCategory as IncomeCategory ? 'incomes-color' : 'expenses-color';
    console.log('here!!!')
    //TODO: set correct color to text.
    return DetailedCategoryComponent.isInstanceIncomeCategory(
      this.openedCategory
    ) ? 'incomes-color' : 'expenses-color';
  }

  private static isInstanceIncomeCategory(object: any): object is IncomeCategory {
    return 'outcome' in object;
  }
}
