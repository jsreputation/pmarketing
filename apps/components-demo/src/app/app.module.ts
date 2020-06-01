import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RewardsModule } from './rewards/rewards.module';
import {
  AuthenticationModule,
  UtilsModule as PerxCoreUtilsModule,
  RewardsModule as PerxRewardsModule,
  VouchersModule as PerxVouchersModule,
  MerchantsModule as PerxMerchantsModule,
  SurveyModule as PerxSurveyModule,
  ProfileModule as PerxProfileModule,
  ConfigModule,
  ProfileServiceModule
} from '@perxtech/core';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatCardModule, MatRippleModule, MatIconModule, MatDialogModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { UtilsModule } from './utils/utils.module';
import { HomeComponent } from './home/home.component';
import { LocationModule } from './location/location.module';
import { HttpClientModule } from '@angular/common/http';

import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import * as Hammer from 'hammerjs';

// https://medium.com/angular-in-depth/gestures-in-an-angular-application-dde71804c0d0
// to override default settings
export class MyHammerConfig extends HammerGestureConfig {
  public overrides: any = {
    swipe: { direction: Hammer.DIRECTION_ALL }, // in order to swipe up and down
    pinch: { enable: false },
    rotate: { enable: false }
  };
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    ConfigModule.forRoot({ ...environment }),
    MatToolbarModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthenticationModule,
    PerxVouchersModule,
    PerxRewardsModule,
    PerxSurveyModule,
    PerxProfileModule,
    ProfileServiceModule.forRoot(),
    FormsModule,
    RewardsModule,
    PerxMerchantsModule,
    UtilsModule,
    PerxCoreUtilsModule,
    LocationModule,
    MatCardModule,
    MatRippleModule,
    MatIconModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
