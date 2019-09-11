import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  AuthenticationModule,
  RewardsModule,
  ProfileModule,
  LoyaltyModule,
  LocationModule,
  ConfigModule,
} from '@perx/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {APP_BASE_HREF} from '@angular/common';
import {UnauthorizedInterceptor} from './login/unauthorized.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ConfigModule.forRoot({...environment}),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthenticationModule,
    RewardsModule,
    ProfileModule,
    LoyaltyModule,
    LocationModule
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: environment.baseHref},
    {provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
