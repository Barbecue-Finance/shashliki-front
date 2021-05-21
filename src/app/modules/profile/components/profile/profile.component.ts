import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {UserService} from 'src/app/shared/services/user.service';
import {Md5} from "ts-md5";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  isLoaded = false

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
    this._userService.getById(this._userService.id).subscribe(u => {
      this.authFormGroup = new FormGroup({
        'username': new FormControl('', this.validators),
        'login': new FormControl('', this.validators),
        'password': new FormControl('', this.validators),
      })

      // TODO: Fill form with 'u.' data
      // Note: '.password' is never present, unless entered in UI

      this.isLoaded = true
    });
  }

  save(): void {
    if (this.authFormGroup.invalid) {
      return
    }

    const values = {...this.authFormGroup.value}
    values.id = this._userService.id

    values.password = new Md5().appendStr(values.password).end()
    this.isFormSent = true

    this._userService.update(values)
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
