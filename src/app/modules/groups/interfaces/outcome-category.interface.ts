import {OutcomeOperationCategory} from "../../../shared/interfaces/operation-categories/outcome-operation-category.interface";
import {CategoryInterface} from "./category.interface";

export interface OutcomeCategory extends CategoryInterface {
  category: OutcomeOperationCategory,
  outcome: null
}
