import { NgModule } from '@angular/core';
import { VouchersModule } from './vouchers/vouchers.module';
import { PinInputComponent } from './pin-input/pin-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ShakeTreeComponent } from './shake-tree/shake-tree.component';
import { PopupComponent } from './popup/popup.component';

import { MatDialogModule, MatButtonModule } from '@angular/material';
import { PuzzlesModule } from './puzzles/puzzles.module';
import { AuthenticationModule } from './authentication/authentication.module';
// import { CognitoModule } from './whistler/cognito/cognito.module';
// import { OauthModule } from './v4/oauth/oauth.module';
import { PinataComponent } from './pinata/pinata.component';
import { HttpClientModule } from '@angular/common/http';
// import { CampaignModule } from './campaign/campaign.module';

const modules = [VouchersModule, PuzzlesModule, AuthenticationModule];

@NgModule({
  declarations: [
    PinInputComponent,
    ShakeTreeComponent,
    PopupComponent,
    PinataComponent
  ],
  imports: [
    ...modules,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    HttpClientModule,
    CommonModule
  ],
  exports: [
    ...modules,
    PinInputComponent,
    ShakeTreeComponent,
    PopupComponent,
    PinataComponent
  ]
})
export class PerxCoreModule {}
