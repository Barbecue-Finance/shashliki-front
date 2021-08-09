import {MoneyOperation} from "./money-operation.interface";

export interface OutcomeMoneyOperation extends MoneyOperation {
  outComeOperationCategoryId: number,
  operationCategoryTitle: string
}
