import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  VouchersModule,
  RewardsModule,
  MerchantsModule,
  PerxCoreModule,
  AuthenticationModule,
  CampaignModule,
  GameModule,
  UtilsModule,
  ConfigModule,
  ProfileModule,
  ConfigService,
  AuthenticationService,
  ThemesService,
  IConfig,
  TokenStorage,
  LanguageService,
  CampaignServiceModule, ProfileServiceModule, SettingsModule, InstantOutcomeTransactionServiceModule
} from '@perxtech/core';
import { GameComponent } from './game/game.component';
import { ActivationCodeComponent } from './activation-code/activation-code.component';
import { RedemptionComponent } from './redemption/redemption.component';
import { TncComponent } from './tnc/tnc.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VouchersComponent } from './vouchers/vouchers.component';
import { VoucherComponent } from './vouchers/voucher/voucher.component';
import { DatePipe } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { ResultComponent } from './result/result.component';
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
  authService: AuthenticationService,
  themesService: ThemesService) =>
  () => new Promise((resolve) => {
    configService.readAppConfig().pipe(
      tap((config: IConfig<void>) => translateService.setDefaultLang(config.defaultLang || 'en')),
      switchMap(() => authService.getAppToken()),
      switchMap(() => themesService.getThemeSetting())
    ).toPromise().then(() => resolve());
  });

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    ResultComponent,
    ActivationCodeComponent,
    RedemptionComponent,
    TncComponent,
    ContactUsComponent,
    VouchersComponent,
    VoucherComponent,
    LoginComponent
  ],
  imports: [
    ConfigModule.forRoot({ ...environment }),
    SettingsModule.forRoot({ ...environment }),
    BrowserModule,
    AppRoutingModule,
    RewardsModule.forRoot(),
    VouchersModule,
    InstantOutcomeTransactionServiceModule.forRoot(),
    MerchantsModule.forRoot(),
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatIconModule,
    MatProgressBarModule,
    BrowserAnimationsModule,
    PerxCoreModule,
    ProfileModule,
    ProfileServiceModule,
    CampaignModule,
    CampaignServiceModule.forRoot(),
    GameModule,
    AuthenticationModule,
    FormsModule,
    UtilsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        deps: [HttpClient, HttpBackend, ConfigService, TokenStorage],
        useClass: LanguageService
      }
    }),
  ],
  providers: [
    DatePipe,
    {
      provide: APP_INITIALIZER,
      useFactory: setLanguage,
      deps: [TranslateService, ConfigService, AuthenticationService, ThemesService], multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
