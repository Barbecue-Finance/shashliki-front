import { IncomeOperationCategory } from "./operation-categories/income-operation-category.interface";
import { OutСomeOperationCategory } from "./operation-categories/outcome-operation-category.interface";

export interface Purse {
    id: number,
    amount: number,
    incomeOperationCategories: IncomeOperationCategory[]
    outComeOperationCategories: OutСomeOperationCategory[]
}
