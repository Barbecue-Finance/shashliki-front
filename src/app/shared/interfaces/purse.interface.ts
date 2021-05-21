import { IncomeOperationCategory } from "./operation-categories/income-operation-category.interface";
import { OutcomeOperationCategory } from "./operation-categories/outcome-operation-category.interface";

export interface Purse {
    id: number,
    amount: number,
    incomeOperationCategories: IncomeOperationCategory[]
    outComeOperationCategories: OutcomeOperationCategory[]
}
