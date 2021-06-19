import {HttpClient} from '@angular/common/http';
import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {UserService} from "../../../../shared/services/user.service";
import {GroupService} from "../../services/group.service";
import {MoneyOperation} from "../../../../shared/interfaces/money-operations/money-operation.interface";
import {MoneyOperationService} from "../../../../shared/services/money-operation.service";
import {PurseService} from "../../../../shared/services/purse.service";
import {OutComeMoneyOperation} from "../../../../shared/interfaces/money-operations/outcome-money-operation.interface";
import {IncomeMoneyOperation} from "../../../../shared/interfaces/money-operations/income-money-operation.interface";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";


@Component({
  selector: 'app-create-group',
  templateUrl: './create-operation.component.html',
  styleUrls: ['./create-operation.component.sass']
})
export class CreateOperationComponent implements OnInit {

  formGroup: FormGroup = new FormGroup({})
  validators = [Validators.required]
  isFormSent: boolean = false

  // TODO
  @Input() isChecked = false

  constructor(
    private _router: Router,
    readonly matSnackBar: MatSnackBar,
    private _groupService: GroupService,
    private _userService: UserService,
    private _moneyOperation: MoneyOperationService,
    private _purseService: PurseService
  ) {
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      'title': new FormControl('', this.validators),
      'sum': new FormControl('', this.validators)
    })
  }

  send(): void {
    if (this.formGroup.invalid) {
      return
    }

    const values = {...this.formGroup.value}
    values.creatorId = this._userService.id
    this.isFormSent = true

    this._purseService.getByGroup(this._groupService.openedGroupId)
      .subscribe((purse) => {

        if (this.isChecked) {
          console.log("sending outcome")
          let myOperation: OutComeMoneyOperation = {
            amount: +values.sum,
            comment: '',
            dateTime: '',
            userId: this._userService.id,
            purseId: purse.id,
            id: 0,
            userUsername: '',
            outComeOperationCategoryId: 0,
            operationCategoryTitle: values.title
          }
          this._moneyOperation.createOutCome(myOperation).subscribe(() => {
            this.isFormSent = false
            this.matSnackBar.open('Успешно', '', {duration: 3000})
            this._router.navigate(['/groups'])
          }, error => {
            this.isFormSent = false
            if (error.error?.error) {
              this.matSnackBar.open(error.error?.error, '', {duration: 3000})
            } else {
              this.matSnackBar.open('Ошибка на сервере', '', {duration: 3000})
              console.log('Error:', error)
            }
          });

        } else {
          console.log("sending income")
          let myOperation: IncomeMoneyOperation = {
            amount: +values.sum,
            comment: '',
            dateTime: '',
            userId: this._userService.id,
            purseId: purse.id,
            id: 0,
            userUsername: '',
            incomeOperationCategoryId: 0,
            operationCategoryTitle: values.title
          }

          this._moneyOperation.createIncome(myOperation).subscribe(() => {
            this.isFormSent = false
            this.matSnackBar.open('Успешно', '', {duration: 3000})
            this._router.navigate(['/groups'])
          }, error => {
            this.isFormSent = false
            if (error.error?.error) {
              this.matSnackBar.open(error.error?.error, '', {duration: 3000})
            } else {
              this.matSnackBar.open('Ошибка на сервере', '', {duration: 3000})
              console.log('Error:', error)
            }
          });
        }
      })
  }

  handleToggle($event: MatSlideToggleChange) {
    this.isChecked = $event.checked
  }
}
