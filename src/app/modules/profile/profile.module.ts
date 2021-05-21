import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from './components/profile/profile.component';
import {SharedModule} from "../../shared/modules/shared.module";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', redirectTo: 'profile'},
      {path: 'profile', component: ProfileComponent},
    ]),
    SharedModule
  ]
})
export class ProfileModule {
};
