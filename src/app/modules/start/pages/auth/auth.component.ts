import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {UserService} from 'src/app/shared/services/user.service';
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit {

  authFormGroup: FormGroup = new FormGroup({})
  validators = [Validators.required]
  isFormSent: boolean = false

  constructor(
    private _router: Router,
    readonly matSnackBar: MatSnackBar,
    private _userService: UserService
  ) {
  }

  ngOnInit(): void {
    this._userService.authPageEntered();


    this.authFormGroup = new FormGroup({
      'login': new FormControl('', this.validators),
      'password': new FormControl('', this.validators),
      'rememberMe': new FormControl(''),
    })
  }

  auth(): void {
    if (this.authFormGroup.invalid) {
      return
    }


    const values = this.extrudeValues();


    this._userService.login(values)
      .subscribe(() => {
          this.isFormSent = false
          this._router.navigate(['groups'])
        },

        error => {
          this.isFormSent = false

          if (error.error?.error) {
            this.matSnackBar.open(error.error?.error, '', {duration: 3000})
          } else {
            this.matSnackBar.open('Ошибка на сервере', '', {duration: 3000})
            console.log('Error:', error)
          }
        })
  }

  private extrudeValues(): any {
    const values = {...this.authFormGroup.value}
    values.password = new Md5().appendStr(values.password).end()
    this.isFormSent = true
    return values;
  }

  register(): void {
    this._router.navigate(['start', 'register']);
  }
}
