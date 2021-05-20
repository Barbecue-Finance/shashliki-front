import { IncomeMoneyOperation } from "./money-operations/income-money-operation.interface";
import { OutComeMoneyOperation } from "./money-operations/outcome-money-operation.interface";

export interface IncomeOutcome {
    outComing: OutComeMoneyOperation[]
    incoming: IncomeMoneyOperation[]
}