import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserService} from 'src/app/shared/services/user.service';
import {Md5} from 'ts-md5/dist/md5';
import {Paths} from "../../../../shared/enums/Paths";
import {Router} from "@angular/router";

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  regFormGroup: FormGroup = new FormGroup({})
  validators = [Validators.required]
  isFormSent: boolean = false

  constructor(
    private _router: Router,
    readonly matSnackBar: MatSnackBar,
    private _userService: UserService
  ) {
  }

  ngOnInit(): void {

    if (this._userService.isLoggedIn()) {
      this._userService.logout()
    }

    this.regFormGroup = new FormGroup({
      'username': new FormControl('', this.validators),
      'login': new FormControl('', this.validators),
      'password': new FormControl('', this.validators),
    })
  }

  register(): void {
    if (this.regFormGroup.invalid) {
      return;
    }

    const values = this.extrudeValues();

    this.processCreation(values);
  }


  private processCreation(values: any) {
    this._userService.create(values)
      .subscribe(() => this._router.navigateByUrl(Paths.groups),
        error => {
          this.handleError(error);
        })
  }


  private handleError(error: any): void {
    this.isFormSent = false

    if (error.error?.error) {
      this.matSnackBar.open(error.error?.error, '', {duration: 3000})
    } else {
      this.matSnackBar.open('Ошибка на сервере', '', {duration: 3000})
      console.log('Error:', error)
    }

  }


  private extrudeValues(): any {
    const values = {...this.regFormGroup.value}
    values.password = new Md5().appendStr(values.password).end()
    this.isFormSent = true
    return values;
  }

  goBackToAuth() {
    this._router.navigateByUrl(Paths.auth);
  }
}
