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
  constructor() {
  }

  ngOnInit(): void {
  }

}
