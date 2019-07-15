import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  AuthenticationModule,
  OauthModule, CognitoModule,
  CampaignModule, GameModule,
  VouchersModule
} from '@perx/core/dist/perx-core';
import { GameComponent } from './game/game.component';

import { MatToolbarModule, MatButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResultComponent } from './result/result.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { ShakeGameComponent } from './shake-game/shake-game.component';
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    ResultComponent,
    HeaderComponent,
    LoginComponent,
    ShakeGameComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    BrowserAnimationsModule,
    VouchersModule.forRoot({ env: environment }),
    CognitoModule.forRoot({ env: environment }),
    OauthModule.forRoot({ env: environment }),
    CampaignModule.forRoot({ env: environment }),
    GameModule.forRoot({ env: environment }),
    AuthenticationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
