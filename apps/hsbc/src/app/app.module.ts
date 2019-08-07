import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
  CognitoModule,
  OauthModule,
  AuthenticationModule,
  CampaignModule,
  VouchersModule,
  ProfileModule,
  StampModule,
  UtilsModule
} from '@perx/core';
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
  MatSidenavModule
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { APP_BASE_HREF, DatePipe } from '@angular/common';
import { SoundModule } from './sound/sound.module';
import { TncComponent } from './tnc/tnc.component';
import { FaqComponent } from './faq/faq.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PuzzleComponent,
    VoucherComponent,
    RedemptionComponent,
    HomeComponent,
    PuzzlesComponent,
    TncComponent,
    FaqComponent,
    ProfileComponent
  ],
  imports: [
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
    VouchersModule.forRoot({ env: environment }),
    CognitoModule.forRoot({ env: environment }),
    OauthModule.forRoot({ env: environment }),
    AuthenticationModule,
    CampaignModule.forRoot({ env: environment }),
    ProfileModule.forRoot({ env: environment }),
    StampModule.forRoot({ env: environment }),
    FormsModule
  ],
  providers: [
    DatePipe,
    {provide: APP_BASE_HREF, useValue: environment.baseHref }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
