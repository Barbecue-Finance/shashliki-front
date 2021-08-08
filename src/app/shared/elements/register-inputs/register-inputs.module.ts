import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthInputsModule} from "../auth-inputs/auth-inputs.module";
import {UsernameInputComponent} from "./username-input/username-input.component";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    UsernameInputComponent
  ],
  imports: [
    AuthInputsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    UsernameInputComponent
  ]
})
export class RegisterInputsModule {
}
