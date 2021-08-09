import {IncomeOperationCategory} from "../../../shared/interfaces/operation-categories/income-operation-category.interface";

export interface IncomeOperationInterface {
  operation: IncomeOperationCategory,
  amount: number
}
