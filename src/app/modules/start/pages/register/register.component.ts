import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from 'src/app/shared/services/user.service';
import {Md5} from 'ts-md5/dist/md5';
import {Router} from "@angular/router";
import UserDto from "../../../../shared/interfaces/dto/user-dto.interface";

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  validators = [Validators.required]
  regFormGroup: FormGroup = new FormGroup({
    'username': new FormControl('', this.validators),
    'login': new FormControl('', this.validators),
    'password': new FormControl('', this.validators),
  })
  isFormSent: boolean = false

  constructor(
    private _router: Router,
    private _userService: UserService
  ) {
  }

  ngOnInit(): void {
    if (this._userService.isLoggedIn()) {
      this._userService.logoutAndNavigateToAuth()
    }
  }

  register(): void {
    if (this.regFormGroup.invalid) {
      return;
    }

    const values = this.extrudeValues();

    this.processCreation(values);
  }


  private processCreation(values: any) {
    this.isFormSent = true

    this._userService.create(values)
      .subscribe(() => {
          this.isFormSent = false;
          this._router.navigate(['groups'])
        },
        error => {
          this.isFormSent = false
        })
  }

  private extrudeValues(): UserDto {
    const values = {...this.regFormGroup.value} as UserDto
    values.password = new Md5().appendStr(values.password).end().toString()
    return values;
  }

  goBackToAuth() {
    this._router.navigate(['start', 'auth']);
  }
}
