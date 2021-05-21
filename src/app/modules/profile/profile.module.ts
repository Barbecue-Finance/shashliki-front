import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from './components/profile/profile.component';
import {SharedModule} from "../../shared/modules/shared.module";
import {RouterModule} from "@angular/router";
import {AllGroupsComponent} from "../categories/components/all-groups/all-groups.component";
import {ReportComponent} from "../categories/components/report/report.component";
import {GroupComponent} from "../categories/components/group/group.component";


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: ProfileComponent},
    ]),
    SharedModule
  ]
})
export class ProfileModule {
};
