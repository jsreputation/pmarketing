import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  PerxCoreModule,
  VouchersModule,
  CognitoModule,
  OauthModule,
  GameModule
} from '@perx/core/dist/perx-core';
import {
  MatToolbarModule,
  MatButtonModule,
  MatTabsModule,
  MatCardModule,
  MatRippleModule,
  MatIconModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { GamePlayComponent } from './game-play/game-play.component';
import { RewardDetailComponent } from './reward-detail/reward-detail.component';
import { RedeemComponent } from './redeem/redeem.component';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    GamePlayComponent,
    RewardDetailComponent,
    RedeemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PerxCoreModule,
    VouchersModule.forRoot({ env: environment }),
    CognitoModule.forRoot({ env: environment }),
    OauthModule.forRoot({ env: environment }),
    GameModule.forRoot({ env: environment }),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    MatRippleModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
