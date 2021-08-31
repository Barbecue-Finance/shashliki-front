import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'groups'
  },
  {
    path: 'start',
    loadChildren: () => import('./modules/start/start.module').then(start => start.StartModule)
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
  {
    path: '**',
    redirectTo: 'groups'
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
