import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {UserService} from "../../../../shared/services/user.service";
import {GroupService} from "../../services/group.service";

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.sass']
})
export class CreateGroupComponent implements OnInit {

  formGroup: FormGroup = new FormGroup({})
  validators = [Validators.required]
  isFormSent: boolean = false


  constructor(
    private _router: Router,
    readonly matSnackBar: MatSnackBar,
    private _groupService: GroupService,
    private _userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      'title': new FormControl('', this.validators)
    })
  }

  save(): void {
    if (this.formGroup.invalid) {
      return
    }

    const values = {...this.formGroup.value}
    values.creatorId = this._userService.id
    this.isFormSent = true

    this._groupService.create(values).subscribe(() => {
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

}
