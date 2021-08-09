import {Injectable, OnInit} from "@angular/core";
import {GroupModule} from "../group.module";
import {GroupService} from "./group.service";
import {IncomeOperationInterface} from "../interfaces/income-operation.interface";
import {OutcomeOperationInterface} from "../interfaces/outcome-operation.interface";
import {OverallOperationsInterface} from "../interfaces/overall-operations.interface";
import {CategoryService} from "./category.service";


@Injectable({
  providedIn: GroupModule
})
export class GroupInfoService implements OnInit{

  //#region Private fields

  private _totalIncome = 0;
  private _totalOutcome = 0;
  private _totalAmount = 0;
  private _incomeOperations: IncomeOperationInterface[] = [];
  private _outcomeOperations: OutcomeOperationInterface[] = [];
  private _date = '';
  private _overallOperations: OverallOperationsInterface = {
    incomeAmount: 0,
    outcomeAmount: 0
  }

  //#endregion

  //#region Getters & Setters

  get totalIncome(): number {
    return this._totalIncome;
  }

  set totalIncome(value) {
    this._totalOutcome = value;
  }

  get totalOutcome(): number {
    return this._totalOutcome;
  }

  set totalOutcome(value) {
    this._totalOutcome = value;
  }

  get totalAmount(): number {
    return this._totalAmount;
  }

  set totalAmount(value) {
    this._totalAmount = value;
  }

  get incomeOperations(): IncomeOperationInterface[] {
    return this._incomeOperations;
  }

  set incomeOperations(values) {
    this._incomeOperations = values;
  }

  get outcomeOperations(): OutcomeOperationInterface[] {
    return this._outcomeOperations;
  }

  set outcomeOperations(values) {
    this._outcomeOperations = values;
  }

  get data(): string {
    return this._date;
  }

  set date(value: string) {
    this._date = value;
  }

  get overallOperations(): OverallOperationsInterface {
    return this._overallOperations;
  }

  set overallOperations(value) {
    this._overallOperations = value;
  }

  //#endregion

  constructor() {
  }

  ngOnInit(): void {
  }

}
