import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from './components/profile/profile.component';
import {RouterModule, Routes} from "@angular/router";
import {DataEditModule} from "../../shared/elements/data-edit/data-edit.module";
import {ReactiveFormsModule} from "@angular/forms";
import {HeaderModule} from "../../shared/elements/header/header.module";
import {AuthInputsModule} from "../../shared/elements/auth-inputs/auth-inputs.module";


const routes: Routes = [
  {
    path: '',
    component: ProfileComponent
  },
]

@NgModule({
  declarations: [
    ProfileComponent
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
