import {Component, OnInit} from '@angular/core';
import {GroupInfoService} from "../../services/group-info.service";
import {GroupService} from "../../services/group.service";
import {OutcomeOperationInterface} from "../../interfaces/outcome-operation.interface";
import {IncomeOperationInterface} from "../../interfaces/income-operation.interface";
import GroupDto from "../../../../shared/interfaces/group.interface";

@Component({
  selector: 'single-group-info',
  templateUrl: './single-group-info.component.html',
  styleUrls: ['./single-group-info.component.sass']
})
export class SingleGroupInfoComponent implements OnInit {

  //#region Fields

  date = '';
  title = '';
  totalOutCome = 0;
  totalIncome = 0;
  outcomeOperations: OutcomeOperationInterface[] = [];
  incomeOperations: IncomeOperationInterface[] = [];
  totalAmount = 0;

  //#endregion

  constructor(
    private _groupInfoService: GroupInfoService,
    private _groupService: GroupService,
  ) {
  }

  ngOnInit(): void {
    this._groupInfoService.loadFields();
    this.loadDisplayItems();
  }

  private loadDisplayItems(): void {
    this.date = this._groupInfoService.date;

    this.title = this._groupInfoService.title;

    this.totalOutCome = this._groupInfoService.totalOutcome;

    this.totalIncome = this._groupInfoService.totalIncome;

    this.outcomeOperations = this._groupInfoService.outcomeOperations;

    this.incomeOperations = this._groupInfoService.incomeOperations;

    this.totalAmount = this._groupInfoService.totalAmount;
  }

  membersClicked(): void {
  }

  getMembersString(): string {
    return ''
  }

  openCreateOperationPage(): void {
  }

  showInfoCategoryOutcome(operation: OutcomeOperationInterface): void {
  }

  showInfoCategoryIncome(operation: IncomeOperationInterface): void {
  }
}
