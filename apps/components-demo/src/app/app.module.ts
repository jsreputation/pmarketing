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
  SurveyModule as PerxSurveyModule
} from '@perx/core';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatCardModule, MatRippleModule, MatIconModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { UtilsModule } from './utils/utils.module';
import { HomeComponent } from './home/home.component';
import { LocationModule } from './location/location.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    MatToolbarModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthenticationModule.forRoot({ env: environment }),
    PerxVouchersModule.forRoot({ env: environment }),
    PerxRewardsModule.forRoot({ env: environment }),
    PerxSurveyModule.forRoot({ env: environment }),
    FormsModule,
    RewardsModule,
    UtilsModule,
    PerxCoreUtilsModule,
    LocationModule,
    MatCardModule,
    MatRippleModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
