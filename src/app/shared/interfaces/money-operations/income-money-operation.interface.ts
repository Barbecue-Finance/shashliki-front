import { MoneyOperation } from "./money-operation.interface";

export interface IncomeMoneyOperation extends MoneyOperation{
    incomeOperationCategoryId: number
}