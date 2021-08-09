import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {UserService} from "../../../../shared/services/user.service";
import {GroupService} from "../../services/group.service";
import {CreateGroupDto} from "../../../../shared/interfaces/dto/create-group.dto";

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.sass']
})
export class CreateGroupComponent implements OnInit {

  validators = [Validators.required]
  formGroup: FormGroup = new FormGroup({
    'title': new FormControl('', this.validators)
  })
  isFormSent: boolean = false

  constructor(
    private _router: Router,
    readonly matSnackBar: MatSnackBar,
    private _groupService: GroupService,
    private _userService: UserService
  ) {
  }

  ngOnInit(): void {
  }

  save(): void {
    if (this.formGroup.invalid) {
      return
    }

    const creatingGroup: CreateGroupDto = this.formGroup.value as CreateGroupDto
    creatingGroup.creatorId = this._userService.id
    creatingGroup.type = 1

    this.isFormSent = true

    this._groupService.create(creatingGroup).subscribe(() => {
      this.isFormSent = false
      this.matSnackBar.open('Успешно', '', {duration: 3000})
      this._router.navigate(['groups'])
    }, error => {
      this.isFormSent = false
    });
  }

}
