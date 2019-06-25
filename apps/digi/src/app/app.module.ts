import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PerxCoreModule, AuthenticationModule, OauthModule, CognitoModule, CampaignModule, GameModule } from '@perx/core/dist/perx-core';
import { GameComponent } from './game/game.component';

import { MatToolbarModule, MatButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CongratsComponent } from './congrats/congrats.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    CongratsComponent,
    HeaderComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    PerxCoreModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    BrowserAnimationsModule,
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
