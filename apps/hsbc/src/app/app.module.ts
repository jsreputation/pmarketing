import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PuzzleComponent } from './puzzle/puzzle.component';
import { VoucherComponent } from './voucher/voucher.component';
import { RedemptionComponent } from './redemption/redemption.component';
import { HomeComponent } from './home/home.component';
import { PuzzlesComponent } from './puzzles/puzzles.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  PerxCoreModule,
  AuthenticationModule,
  CampaignModule,
  VouchersModule,
  MerchantsModule,
  ProfileModule,
  StampModule,
  UtilsModule,
  ConfigModule,
  RewardsModule,
  RewardPopupComponent,
  SettingsModule,
  ConfigService,
  AuthenticationService,
  ThemesService,
  IConfig,
  TokenStorage,
  LanguageService,
  CampaignServiceModule,

  // ICampaignService,
  // ConfigService
  // StampService,
  // ICampaignService
} from '@perxtech/core';
import { environment } from '../environments/environment';
import {
  MatButtonModule,
  MatListModule,
  MatTabsModule,
  MatCardModule,
  MatRippleModule,
  MatIconModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatSidenavModule,
  MatDialogModule
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { APP_BASE_HREF, DatePipe } from '@angular/common';
import { SoundModule } from './sound/sound.module';
import { ProfileComponent } from './profile/profile.component';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
import { NavigateToolbarComponent } from './navigate-toolbar/navigate-toolbar.component';
import { WalletComponent } from './wallet/wallet.component';
import { AccountComponent } from './account/account.component';
import { ContentModule } from './content/content.module';
import { UnauthorizedInterceptor } from './login/unauthorized.interceptor';
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
    LoginComponent,
    PuzzleComponent,
    VoucherComponent,
    RedemptionComponent,
    HomeComponent,
    PuzzlesComponent,
    ProfileComponent,
    NavigateToolbarComponent,
    WalletComponent,
    AccountComponent
    // PuzzleListComponent, // mock service/component
  ],
  imports: [
    ConfigModule.forRoot({ ...environment }),
    SettingsModule.forRoot({ ...environment }),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatListModule,
    MatTabsModule,
    MatToolbarModule,
    MatIconModule,
    PerxCoreModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatRippleModule,
    MatProgressBarModule,
    SoundModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    UtilsModule,
    VouchersModule,
    RewardsModule,
    MerchantsModule,
    AuthenticationModule,
    CampaignModule,
    CampaignServiceModule.forRoot(),
    ProfileModule,
    StampModule,
    FormsModule,
    RewardsModule,
    HttpClientModule,
    MatDialogModule,
    ContentModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        deps: [HttpClient, ConfigService, TokenStorage],
        useClass: LanguageService
      }
    }),
  ],
  providers: [
    Title,
    DatePipe,
    {
      provide: APP_INITIALIZER,
      useFactory: setLanguage,
      deps: [TranslateService, ConfigService, AuthenticationService, ThemesService], multi: true
    },
    { provide: APP_BASE_HREF, useValue: environment.baseHref },
    { provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true },
    // { provide: ConfigService, useValue: configServiceStub },
    // { provide: StampService, useValue: stampServiceStub },
    // { provide: ICampaignService, useValue: campaignServiceStub },
  ],
  bootstrap: [AppComponent],
  entryComponents: [RewardPopupComponent]
})
export class AppModule { }
