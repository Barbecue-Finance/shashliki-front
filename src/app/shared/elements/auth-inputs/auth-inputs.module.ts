import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginInputComponent} from "./login-input/login-input.component";
import {PasswordInputComponent} from "./password-input/password-input.component";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    LoginInputComponent,
    PasswordInputComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginInputComponent,
    PasswordInputComponent
  ]
})
export class AuthInputsModule { }
