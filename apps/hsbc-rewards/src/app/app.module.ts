import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  CognitoModule,
  OauthModule,
  AuthenticationModule,
  RewardsModule,
  ProfileModule,
  LoyaltyModule,
  LocationModule,
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
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthenticationModule,
    HttpClientModule,
    CognitoModule.forRoot({env: environment}),
    OauthModule.forRoot({env: environment}),
    RewardsModule.forRoot({env: environment}),
    ProfileModule.forRoot({env: environment}),
    LoyaltyModule.forRoot({env: environment}),
    LocationModule.forRoot({env: environment})
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: environment.baseHref},
    {provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
