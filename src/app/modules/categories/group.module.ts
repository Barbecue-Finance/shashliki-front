import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AllGroupsComponent} from './components/all-categories/all-groups.component';
import {SharedModule} from "../../shared/modules/shared.module";
import {RouterModule} from "@angular/router";
import {GroupService} from "./services/group.service";
import {AppModule} from "../../app.module";
import {GroupComponent} from './components/category/group.component';

@NgModule({
  declarations: [
    AllGroupsComponent,
    GroupComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: AllGroupsComponent},
      {path: ':id', component: GroupComponent}
    ]),
    SharedModule
  ],
  providers: [
    GroupService
  ]
})
export class GroupModule {
}
