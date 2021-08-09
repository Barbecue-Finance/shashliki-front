import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AllGroupsComponent} from './pages/all-groups/all-groups.component';
import {RouterModule, Routes} from "@angular/router";
import {GroupService} from "./services/group.service";
import {SingleGroupComponent} from './pages/single-group/single-group.component';
import {ReportComponent} from './components/report/report.component';
import {PurseService} from 'src/app/shared/services/purse.service';
import {MoneyOperationService} from 'src/app/shared/services/money-operation.service';
import {IncomeOperationCategoryService} from 'src/app/shared/services/income-operation-category.service';
import {OutComeOperationCategoryService} from 'src/app/shared/services/outcome-operation-category.service';
import {CreateGroupComponent} from "./pages/create-group/create-group.component";
import {DetailedOperationComponent} from "./components/detailed-operation/detailed-operation.component";
import {CategoryService} from "./services/category.service";
import {MoneyPipe} from "../../shared/pipes/money.pipe";
import {CreateOperationComponent} from "./pages/create-operation/create-operation.component";
import {MaterialSharedModule} from "../../shared/modules/material-shared.module";
import {EventComponent} from './components/event/event.component';
import {HeaderModule} from "../../shared/elements/header/header.module";
import {CalendarModule} from "../../shared/elements/calendar/calendar.module";
import {PipesModule} from "../../shared/pipes/pipes.module";
import {DataEditModule} from "../../shared/elements/data-edit/data-edit.module";
import {ReactiveFormsModule} from "@angular/forms";
import { SingleGroupInfoComponent } from './elements/single-group-info/single-group-info.component';


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
    SingleGroupComponent,
    ReportComponent,
    CreateGroupComponent,
    DetailedOperationComponent,
    CreateOperationComponent,
    EventComponent,
    SingleGroupInfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HeaderModule,
    CalendarModule,
    PipesModule,
    MaterialSharedModule,
    DataEditModule,
    ReactiveFormsModule
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
