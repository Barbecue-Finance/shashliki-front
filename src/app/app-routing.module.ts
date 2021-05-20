import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './shared/guards/auth.guard';
import {ReactiveFormsModule} from "@angular/forms";
import {AuthComponent} from "./components/auth/auth.component";

const routes: Routes = [
  {path: '', component: AuthComponent, canActivate: [AuthGuard]},
  {path: 'auth', component: AuthComponent},
  {
    path: 'groups',
    loadChildren: () => import('./modules/categories/group.module').then(cs => cs.GroupModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
