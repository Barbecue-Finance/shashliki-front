import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
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
  validators = [Validators.required]

  formGroup: FormGroup = new FormGroup({
    'username': new FormControl(this.username, this.validators),
    'login': new FormControl(this.login, this.validators),
    'password': new FormControl(this.password, this.validators),
  })
  isFormSent: boolean = false

  constructor(
    private _router: Router,
    private _userService: UserService
  ) {
  }


  ngOnInit(): void {
    this._userService.getById(this._userService.id).subscribe(user => {
      this.formGroup.patchValue(user)
      this.isLoaded = true
    });
  }

  save(): void {
    if (this.formGroup.invalid) {
      return;
    }

    const updatingProfile = this.extrudeValues()

    this.isFormSent = true

    this._userService.update(updatingProfile)
      .subscribe(() => {
        this.isFormSent = false
        this._router.navigate(['groups'])
      }, error => {
        this.isFormSent = false
      })
  }

  private extrudeValues(): UpdateProfileDto {
    const values = {...this.formGroup.value} as UpdateProfileDto
    values.password = new Md5().appendStr(values.password).end().toString()
    return values;
  }

}
