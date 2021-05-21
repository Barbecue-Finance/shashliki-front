import {NgModule, Provider} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthComponent} from './components/auth/auth.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialSharedModule} from './shared/modules/material-shared.module';
import {LoginInputComponent} from './shared/components/inputs/login-input/login-input.component';
import {FormsModule} from '@angular/forms';
import {PasswordInputComponent} from './shared/components/inputs/password-input/password-input.component';
import {SharedModule} from './shared/modules/shared.module';
import {AuthInterceptor} from './shared/interceptors/auth.interceptor';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { CreateGroupComponent } from './modules/categories/components/create-group/create-group.component';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginInputComponent,
    PasswordInputComponent,
    CreateGroupComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialSharedModule,
    FormsModule,
    SharedModule
  ],
  providers: [INTERCEPTOR_PROVIDER],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
