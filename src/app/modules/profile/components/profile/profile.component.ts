import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {AccountService} from 'src/app/shared/services/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  authFormGroup: FormGroup = new FormGroup({})
  validators = [Validators.required]
  isFormSent: boolean = false

  constructor(
    private _router: Router,
    readonly matSnackBar: MatSnackBar,
    private _accountService: AccountService
  ) {
  }

  ngOnInit(): void {

    if (this._accountService.isLoggedIn()) {
      this._accountService.logout()
    }

    this.authFormGroup = new FormGroup({
      'username': new FormControl('', this.validators),
      'login': new FormControl('', this.validators),
      'password': new FormControl(''),
    })
  }

  save(): void {
    if (this.authFormGroup.invalid) {
      return
    }


    const values = {...this.authFormGroup.value}
    this.isFormSent = true

    this._accountService.login(values)
      .subscribe(() => {
        this.isFormSent = false

        this._router.navigate(['/groups'])

      }, error => {
        this.isFormSent = false
        if (error.error?.error) {
          this.matSnackBar.open(error.error?.error, '', {duration: 3000})
        } else {
          this.matSnackBar.open('Ошибка на сервере', '', {duration: 3000})
          console.log('Error:', error)
        }
      })
  }

}
