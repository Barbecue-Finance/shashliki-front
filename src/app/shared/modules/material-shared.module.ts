import { NgModule } from '@angular/core';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";


const MODULES = [
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatSlideToggleModule
];

@NgModule({
  imports: MODULES,

  exports: MODULES
})

export class MaterialSharedModule {

}
