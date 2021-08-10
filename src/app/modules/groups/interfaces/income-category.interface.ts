import {IncomeOperationCategory} from "../../../shared/interfaces/operation-categories/income-operation-category.interface";
import {CategoryInterface} from "./category.interface";

export interface IncomeCategory extends CategoryInterface{
  category: IncomeOperationCategory,
  income: null
}
