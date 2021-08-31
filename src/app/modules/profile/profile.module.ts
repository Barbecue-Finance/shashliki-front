import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from './pages/profile/profile.component';
import {RouterModule, Routes} from "@angular/router";
import {DataEditModule} from "../../shared/elements/data-edit/data-edit.module";
import {ReactiveFormsModule} from "@angular/forms";
import {HeaderModule} from "../../shared/elements/header/header.module";
import {AuthInputsModule} from "../../shared/elements/auth-inputs/auth-inputs.module";
import {ProfileEditComponent} from './pages/profile-edit/profile-edit.component';
import {ProfilePasswordChangeComponent} from './pages/profile-password-change/profile-password-change.component';
import {PasswordInputComponent} from "../../shared/elements/auth-inputs/password-input/password-input.component";


const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    pathMatch: 'full'
  },
  {
    path: 'edit',
    component: ProfileEditComponent
  },
  {
    path: 'password-change',
    component: PasswordInputComponent
  }
]

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileEditComponent,
    ProfilePasswordChangeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HeaderModule,
    DataEditModule,
    ReactiveFormsModule,
    AuthInputsModule
  ]
})
export class ProfileModule {
}
