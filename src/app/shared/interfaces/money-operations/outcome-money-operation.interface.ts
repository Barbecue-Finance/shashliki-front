import { MoneyOperation } from "./money-operation.interface";

export interface OutComeMoneyOperation extends MoneyOperation{
    outComeOperationCategoryId: number
}