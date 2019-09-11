import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  AuthenticationModule,
  CampaignModule,
  GameModule,
  VouchersModule,
  UtilsModule,
  ConfigModule
} from '@perx/core';
import { GameComponent } from './game/game.component';

import { MatToolbarModule, MatButtonModule, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { httpInterceptorProviders } from './UserIdInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
  ],
  imports: [
    ConfigModule.forRoot({...environment}),
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    BrowserAnimationsModule,
    UtilsModule,
    MatDialogModule,
    VouchersModule,
    AuthenticationModule,
    CampaignModule,
    GameModule
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
