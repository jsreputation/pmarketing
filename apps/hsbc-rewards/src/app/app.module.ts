import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CognitoModule,
  OauthModule,
  AuthenticationModule,
  RewardsModule,
  ProfileModule,
  LoyaltyModule,
  LocationModule,
  VouchersModule
} from '@perx/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
    CognitoModule.forRoot({ env: environment }),
    OauthModule.forRoot({ env: environment }),
    RewardsModule.forRoot({ env: environment }),
    ProfileModule.forRoot({ env: environment }),
    LoyaltyModule.forRoot({ env: environment }),
    LocationModule.forRoot({ env: environment })
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
