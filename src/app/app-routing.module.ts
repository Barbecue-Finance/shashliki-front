import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './shared/guards/auth.guard';
import {AuthComponent} from "./components/auth/auth.component";
import {RegisterComponent} from "./components/register/register.component";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/groups/group.module').then(cs => cs.GroupModule),
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'groups',
    loadChildren: () => import('./modules/groups/group.module').then(cs => cs.GroupModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./modules/profile/profile.module').then(p => p.ProfileModule),
    canActivate: [AuthGuard]
  },


  // {
  //   path: '**',
  //   loadChildren: () => import('./modules/groups/group.module').then(cs => cs.GroupModule),
  //   // canActivate: [AuthGuard]
  // }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
