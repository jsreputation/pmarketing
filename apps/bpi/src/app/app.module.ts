import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  PerxCoreModule,
  CognitoModule,
  OauthModule,
  AuthenticationModule,
  CampaignModule,
  VouchersModule,
  StampModule,
  UtilsModule
} from '@perx/core';
import { HeaderComponent } from './header/header.component';
import { GameComponent } from './game/game.component';
import { CongratsComponent } from './congrats/congrats.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule
} from '@angular/material';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingComponent } from './landing/landing.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GameComponent,
    CongratsComponent,
    LoginComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PerxCoreModule,
    UtilsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    VouchersModule.forRoot({ env: environment }),
    CognitoModule.forRoot({ env: environment }),
    OauthModule.forRoot({ env: environment }),
    CampaignModule.forRoot({ env: environment }),
    StampModule.forRoot({ env: environment }),
    AuthenticationModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
