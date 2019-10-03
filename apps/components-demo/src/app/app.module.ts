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
  ConfigModule
} from '@perx/core';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatCardModule, MatRippleModule, MatIconModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { UtilsModule } from './utils/utils.module';
import { HomeComponent } from './home/home.component';
import { LocationModule } from './location/location.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    ConfigModule.forRoot({...environment}),
    MatToolbarModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthenticationModule,
    PerxVouchersModule,
    PerxRewardsModule,
    PerxSurveyModule,
    PerxProfileModule,
    FormsModule,
    RewardsModule,
    PerxMerchantsModule,
    UtilsModule,
    PerxCoreUtilsModule,
    LocationModule,
    MatCardModule,
    MatRippleModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
