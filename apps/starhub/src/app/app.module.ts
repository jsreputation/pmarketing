import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationModule, CognitoModule, OauthModule, UtilsModule, ProfileModule } from '@perx/core';
import { environment } from '../environments/environment';
import { MatDialogModule, MatIconModule, MatCardModule, MatToolbarModule, MatRippleModule, MatButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryComponent } from './category/category.component';
import { RewardComponent } from './reward/reward.component';
import { LocationsComponent } from './locations/locations.component';
import { TncComponent } from './tnc/tnc.component';
import { VoucherComponent } from './voucher/voucher.component';
import { RedemptionComponent } from './redemption/redemption.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    RewardComponent,
    LocationsComponent,
    TncComponent,
    VoucherComponent,
    RedemptionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    MatDialogModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatRippleModule,
    MatButtonModule,
    UtilsModule,
    BrowserAnimationsModule,
    CognitoModule.forRoot({ env: environment }),
    OauthModule.forRoot({ env: environment }),
    ProfileModule.forRoot({ env: environment })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
