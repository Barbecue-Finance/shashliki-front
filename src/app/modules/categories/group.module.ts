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
import {InfoCategoryComponent} from "./components/info-category/info.category.component";
import {CategoryService} from "./services/category.service";
import {MoneyPipe} from "../../shared/pipes/money.pipe";

@NgModule({
  declarations: [
    AllGroupsComponent,
    GroupComponent,
    ReportComponent,
    CreateGroupComponent,
    InfoCategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: AllGroupsComponent},
      {path: 'create', component: CreateGroupComponent},
      {
        path: ':id', component: GroupComponent, children: [
          {path: 'report', component: ReportComponent}
        ]
      }
    ]),
    SharedModule
  ],
  providers: [
    GroupService,
    CategoryService,
    PurseService,
    MoneyOperationService,
    IncomeOperationCategoryService,
    OutComeOperationCategoryService,
    MoneyPipe
  ]
})
export class GroupModule {
}
