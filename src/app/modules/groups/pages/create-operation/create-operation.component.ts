import {Component, Input, OnInit, SkipSelf} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {UserService} from "../../../../shared/services/user.service";
import {GroupService} from "../../services/group.service";
import {MoneyOperationService} from "../../services/money-operation.service";
import {PurseService} from "../../services/purse.service";
import {OutcomeMoneyOperation} from "../../../../shared/interfaces/money-operations/outcome-money-operation.interface";
import {IncomeMoneyOperation} from "../../../../shared/interfaces/money-operations/income-money-operation.interface";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {PurseDto} from "../../../../shared/interfaces/purse.interface";


@Component({
  selector: 'app-create-group',
  templateUrl: './create-operation.component.html',
  styleUrls: ['./create-operation.component.sass']
})
export class CreateOperationComponent implements OnInit {

  validators = [Validators.required]
  formGroup: FormGroup = new FormGroup({
    'title': new FormControl('', this.validators),
    'sum': new FormControl('', this.validators)
  })
  isFormSent: boolean = false

  // TODO
  @Input() isOutcome = false

  private purse?: PurseDto

  constructor(
    private _router: Router,
    readonly matSnackBar: MatSnackBar,
    @SkipSelf()  private _groupService: GroupService,
    private _userService: UserService,
    private _moneyOperation: MoneyOperationService,
    private _purseService: PurseService
  ) {
  }

  ngOnInit(): void {
    this._purseService
      .getByGroup(this._groupService.openedGroupId)
      .subscribe((purse) => {
        this.purse = purse;
      });
  }

  send(): void {
    if (this.formGroup.invalid) {
      return
    }

    if (this.purse === undefined) {
      this.matSnackBar.open('Возникла проблема! Попробуйте обновить страницу.', '', {duration: 3000})
      return;
    }

    const values = {...this.formGroup.value} as { title: string, sum: number }
    this.isFormSent = true

    if (this.isOutcome) {
      this.createOutcome(values);
    } else {
      this.createIncome(values);
    }
  }

  private createIncome(values: { title: string, sum: number }) {
    console.log("sending income")
    let myOperation: IncomeMoneyOperation = {
      amount: +values.sum,
      comment: '',
      dateTime: '',
      userId: this._userService.id,
      purseId: this.purse!.id,
      id: 0,
      userUsername: '',
      incomeOperationCategoryId: 0,
      operationCategoryTitle: values.title
    }

    this._moneyOperation.createIncome(myOperation).subscribe(() => {
      this.isFormSent = false
      this.matSnackBar.open('Успешно', '', {duration: 3000})
      this._router.navigate(['groups', this._groupService.openedGroupId.toString()])
    }, error => {
      this.isFormSent = false
    });
  }

  private createOutcome(values: { title: string, sum: number }): void {
    console.log("sending outcome")
    let myOperation: OutcomeMoneyOperation = {
      amount: +values.sum,
      comment: '',
      dateTime: '',
      userId: this._userService.id,
      purseId: this.purse!.id,
      id: 0,
      userUsername: '',
      outComeOperationCategoryId: 0,
      operationCategoryTitle: values.title
    }
    this._moneyOperation.createOutCome(myOperation).subscribe(() => {
      this.isFormSent = false
      this.matSnackBar.open('Успешно', '', {duration: 3000})
      this._router.navigate(['groups', this._groupService.openedGroupId.toString()])
    }, error => {
      this.isFormSent = false
    });
  }

  handleToggle($event: MatSlideToggleChange) {
    this.isOutcome = $event.checked
  }
}
