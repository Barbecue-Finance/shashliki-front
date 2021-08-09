import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {UserService} from 'src/app/shared/services/user.service';
import {Md5} from 'ts-md5/dist/md5';
import {LoginDTO} from "../../../../shared/interfaces/dto/login-dto.interface";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit {

  validators = [Validators.required]
  authFormGroup: FormGroup = new FormGroup({
    'login': new FormControl('', this.validators),
    'password': new FormControl('', this.validators),
    'rememberMe': new FormControl(''),
  })
  isFormSent: boolean = false

  constructor(
    private _router: Router,
    private _userService: UserService
  ) {
  }

  ngOnInit(): void {
    this._userService.authPageEntered();
  }

  auth(): void {
    if (this.authFormGroup.invalid) {
      return
    }
    const values = this.extrudeValues();

    this.isFormSent = true

    this._userService.login(values)
      .subscribe(() => {
          this.isFormSent = false
          this._router.navigate(['groups'])
        },

        error => {
          this.isFormSent = false
        })
  }

  private extrudeValues(): any {
    const values = {...this.authFormGroup.value} as LoginDTO
    values.password = new Md5().appendStr(values.password).end().toString()
    return values;
  }

  register(): void {
    this._router.navigate(['start', 'register']);
  }
}
