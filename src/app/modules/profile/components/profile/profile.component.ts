import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {UserService} from 'src/app/shared/services/user.service';
import {Md5} from "ts-md5";
import {UpdateProfileDto} from "../../../../shared/interfaces/dto/update-profile-dto";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  username: string = ''
  login: string = ''
  password: string = ''

  isLoaded = false

  formGroup: FormGroup = new FormGroup({})
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

      // Note: '.password' is never present, unless entered in UI
      this.username = u.username
      this.login = u.login
      this.password = ''

      this.formGroup = new FormGroup({
        'username': new FormControl(this.username, this.validators),
        'login': new FormControl(this.login, this.validators),
        'password': new FormControl(this.password, this.validators),
      })

      this.isLoaded = true
    });
  }

  save(): void {
    if (this.formGroup.invalid) {
      console.log('form is: ', this.formGroup.valid ? 'valid' : 'invalid');
      console.table(this.formGroup.errors);
      const updatingProfile: UpdateProfileDto = {
        id: this._userService.id,
        username: this.formGroup.get('username')?.value,
        login: this.formGroup.get('login')?.value,
        password: new Md5().appendStr(this.formGroup.get('password')?.value).end().toString()
      }
      console.table(updatingProfile);

      return
    }

    // const values = {...this.formGroup.value}
    // values.id = this._userService.id
    // values.password = new Md5().appendStr(values.password).end()

    const updatingProfile: UpdateProfileDto = {
      id: this._userService.id,
      username: this.formGroup.get('username')?.value,
      login: this.formGroup.get('login')?.value,
      password: new Md5().appendStr(this.formGroup.get('password')?.value).end().toString()
    }

    this.isFormSent = true

    this._userService.update(updatingProfile)
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
