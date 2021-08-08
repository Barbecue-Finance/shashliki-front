import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataEditComponent} from "./data-edit/data-edit.component";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    DataEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    DataEditComponent
  ]
})
export class DataEditModule {
}
