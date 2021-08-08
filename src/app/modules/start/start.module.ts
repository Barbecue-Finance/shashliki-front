import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterInputsModule} from "../../shared/elements/register-inputs/register-inputs.module";
import {AuthInputsModule} from "../../shared/elements/auth-inputs/auth-inputs.module";
import {AuthComponent} from "./pages/auth/auth.component";
import {RegisterComponent} from "./pages/register/register.component";
import {RouterModule, Routes} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";


const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
]

@NgModule({
  declarations: [
    AuthComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthInputsModule,
    RegisterInputsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class StartModule {
}
