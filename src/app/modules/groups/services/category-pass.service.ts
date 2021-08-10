import {Injectable} from "@angular/core";
import {CategoryInterface} from "../interfaces/category.interface";

@Injectable({
  providedIn: 'root'
})
export class CategoryPassService {

  private _openedOperationCategory!: CategoryInterface;

  get openedCategory(): CategoryInterface {
    return this._openedOperationCategory;
  }

  set openedCategory(value: CategoryInterface) {
    this._openedOperationCategory = value;
  }


  saveOpenedCategory(openedCategory: CategoryInterface): void {
    this._openedOperationCategory = openedCategory;
  }
}
