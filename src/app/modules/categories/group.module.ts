import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AllGroupsComponent} from './components/all-groups/all-groups.component';
import {SharedModule} from "../../shared/modules/shared.module";
import {RouterModule} from "@angular/router";
import {GroupService} from "./services/group.service";
import {GroupComponent} from './components/group/group.component';
import {ReportComponent} from './components/report/report.component';
import {PurseService} from 'src/app/shared/services/purse.service';
import {MoneyOperationService} from 'src/app/shared/services/money-operation.service';
import {IncomeOperationCategoryService} from 'src/app/shared/services/income-operation-category.service';
import {OutComeOperationCategoryService} from 'src/app/shared/services/outcome-operation-category.service';
import {CreateGroupComponent} from "./components/create-group/create-group.component";

@NgModule({
  declarations: [
    AllGroupsComponent,
    GroupComponent,
    ReportComponent,
    CreateGroupComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: AllGroupsComponent, children: [
          {path: 'report', component: ReportComponent}
        ]
      },
      {path: ':id', component: GroupComponent}
    ]),
    SharedModule
  ],
  providers: [
    GroupService,
    PurseService,
    MoneyOperationService,
    IncomeOperationCategoryService,
    OutComeOperationCategoryService,
  ]
})
export class GroupModule {
}
