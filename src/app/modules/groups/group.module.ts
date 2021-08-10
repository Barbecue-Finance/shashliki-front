import {AllGroupsComponent} from './pages/all-groups/all-groups.component';
import {CalendarModule} from "../../shared/elements/calendar/calendar.module";
import {CommonModule} from '@angular/common';
import {CreateGroupComponent} from "./pages/create-group/create-group.component";
import {CreateOperationComponent} from "./pages/create-operation/create-operation.component";
import {DataEditModule} from "../../shared/elements/data-edit/data-edit.module";
import {DetailedCategoryComponent} from "./elements/detailed-operation/detailed-category.component";
import {EventComponent} from './components/event/event.component';
import {HeaderModule} from "../../shared/elements/header/header.module";
import {MaterialSharedModule} from "../../shared/modules/material-shared.module";
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {ReportComponent} from './components/report/report.component';
import {RouterModule, Routes} from "@angular/router";
import {SingleGroupComponent} from './pages/single-group/single-group.component';
import {SingleGroupInfoComponent} from './elements/single-group-info/single-group-info.component';
import {GroupService} from "./services/group.service";
import {IncomeOperationCategoryService} from "./services/income-operation-category.service";
import {MoneyOperationService} from "./services/money-operation.service";
import {OutcomeOperationCategoryService} from "./services/outcome-operation-category.service";
import {PurseService} from "./services/purse.service";
import {MoneyPipe} from "../../shared/pipes/money.pipe";
import {PipesModule} from "../../shared/pipes/pipes.module";
import { SumComponent } from './elements/sum/sum.component';
import {CategoryPassService} from "./services/category-pass.service";


const routes: Routes = [
  {
    path: '',
    component: AllGroupsComponent
  },
  {
    path: 'create',
    component: CreateGroupComponent
  },
  {
    path: 'create-operation',
    component: CreateOperationComponent
  },
  {
    path: ':id', component: SingleGroupComponent, children: [
      {path: 'report', component: ReportComponent}
    ]
  }
]

@NgModule({
  declarations: [
    AllGroupsComponent,
    CreateGroupComponent,
    CreateOperationComponent,
    DetailedCategoryComponent,
    EventComponent,
    ReportComponent,
    SingleGroupComponent,
    SingleGroupInfoComponent,
    SumComponent
  ],
  imports: [
    CalendarModule,
    CommonModule,
    DataEditModule,
    HeaderModule,
    MaterialSharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    PipesModule,
  ],
  providers: [
    CategoryPassService,
    GroupService,
    IncomeOperationCategoryService,
    MoneyOperationService,
    OutcomeOperationCategoryService,
    PurseService,
    MoneyPipe
  ]
})
export class GroupModule {
}
