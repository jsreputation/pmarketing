import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  PerxCoreModule,
  AuthenticationModule,
  CampaignModule,
  VouchersModule,
  MerchantsModule,
  RewardsModule,
  StampModule,
  UtilsModule,
  ConfigModule,
  ProfileModule,
  ConfigService,
  AuthenticationService,
  IConfig,
  TokenStorage,
  LanguageService,
  SettingsModule,
  CampaignServiceModule, ProfileServiceModule, InstantOutcomeTransactionServiceModule
} from '@perxtech/core';
import { HeaderComponent } from './header/header.component';
import { GameComponent } from './game/game.component';
import { CongratsComponent } from './congrats/congrats.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingComponent } from './landing/landing.component';
import {
  HttpClientModule,
  HttpClient,
  HttpBackend
} from '@angular/common/http';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { tap, switchMap } from 'rxjs/operators';

export const setLanguage = (
  translateService: TranslateService,
  configService: ConfigService,
  authService: AuthenticationService
) =>
  () => new Promise((resolve) => {
    configService.readAppConfig().pipe(
      tap((config: IConfig<void>) => translateService.setDefaultLang(config.defaultLang || 'en')),
      switchMap(() => authService.getAppToken()),
    ).toPromise().then(() => resolve());
  });

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
    ConfigModule.forRoot({ ...environment }),
    SettingsModule.forRoot({ ...environment }),
    ProfileModule,
    ProfileServiceModule.forRoot(),
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
    VouchersModule,
    InstantOutcomeTransactionServiceModule.forRoot(),
    MerchantsModule.forRoot(),
    RewardsModule.forRoot(),
    AuthenticationModule,
    CampaignModule,
    CampaignServiceModule.forRoot(),
    StampModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        deps: [HttpClient, HttpBackend, ConfigService, TokenStorage],
        useClass: LanguageService
      }
    })
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: setLanguage,
      deps: [TranslateService, ConfigService, AuthenticationService], multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
