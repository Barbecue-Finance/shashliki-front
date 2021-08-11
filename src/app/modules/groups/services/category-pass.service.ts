import {Injectable} from "@angular/core";
import {CategoryInterface} from "../interfaces/category.interface";

@Injectable({
  providedIn: 'root'
})
export class CategoryPassService {
  private _openedOperationCategory!: CategoryInterface;

  private _isIncomeCategory: boolean = false;
  get openedCategory(): CategoryInterface {
    return this._openedOperationCategory;
  }

  set openedCategory(value: CategoryInterface) {
    this._openedOperationCategory = value;
  }

  get isIncomeCategory(): boolean {
    return this._isIncomeCategory;
  }

  set isIncomeCategory(value: boolean) {
    this._isIncomeCategory = value;
  }

  saveOpenedCategory(openedCategory: CategoryInterface, isIncome: boolean): void {
    this._openedOperationCategory = openedCategory;
    this._isIncomeCategory = isIncome;
  }
}
