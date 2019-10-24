import { AccountModule } from './account/account.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  PerxCoreModule,
  VouchersModule,
  AuthenticationModule,
  GameModule,
  UtilsModule,
  ProfileModule,
  ConfigModule,
  RewardsModule,
  MerchantsModule as PerxMerchantsModule,
  CampaignModule as PerxCampaignModule,
  StampModule as PerxStampModule,
} from '@perx/core';
import {
  MatToolbarModule,
  MatButtonModule,
  MatTabsModule,
  MatCardModule,
  MatRippleModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatProgressSpinnerModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {
  HistoryComponent,
  RedeemComponent,
  LoginComponent,
  VoucherDetailComponent,
  RewardDetailsComponent,
  LoadingComponent,
  ContentComponent,
  WalletComponent
} from '@perx/blackcomb-pages';
import { HomeModule } from './home/home.module';

const perxComponents = [
  HistoryComponent,
  RedeemComponent,
  LoginComponent,
  VoucherDetailComponent,
  RewardDetailsComponent,
  LoadingComponent,
  ContentComponent,
  WalletComponent,
];
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable()
export class CustomTranslateLoader implements TranslateLoader  {
    contentHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });

    constructor(private httpClient: HttpClient) {}
    getTranslation(lang: string): Observable<any> {
      console.log(lang)
        const apiAddress = 'http://localhost:4000/' + `assets/en-json.json`;
        return this.httpClient.get(apiAddress, { headers: this.contentHeader })
          .pipe(
            catchError(() => this.httpClient.get(`/assets/i18n/en.json`))
          );
    }
}
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, 'http://localhost:4000/translation/en-json.json', '');
}

export const setLanguage = (translateService: TranslateService) => () => new Promise((resolve) => {
  translateService.setDefaultLang(environment.defaultLang);
  resolve();
});
@NgModule({
  declarations: [
    AppComponent,
    ...perxComponents
  ],
  imports: [
    ConfigModule.forRoot({ ...environment }),
    BrowserModule,
    AppRoutingModule,
    PerxCoreModule,
    VouchersModule,
    AuthenticationModule,
    GameModule,
    AccountModule,
    ProfileModule,
    BrowserAnimationsModule,
    RewardsModule,
    PerxMerchantsModule,
    PerxStampModule,
    MatToolbarModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    MatRippleModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    UtilsModule,
    PerxCampaignModule,
    HttpClientModule,
    HomeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        deps: [HttpClient],
        useClass: CustomTranslateLoader
      }
    })
    
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_INITIALIZER, useFactory: setLanguage, deps: [TranslateService], multi: true }
  ],
})
export class AppModule { }
