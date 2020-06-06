import { CommonModule } from '@angular/common';
import {NgModule} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import {
  RebatesModule as PerxRebatesModule,
  QrScannerComponent,
  UtilsModule,
  ProfileServiceModule
} from '@perxtech/core';
import { RebatesWalletComponent } from './rebates-wallet/rebates-wallet.component';
import { OverviewComponent } from './overview/overview.component';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionCompleteComponent } from './transaction-complete/transaction-complete.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {MatCardModule} from '@angular/material';
import {CurrencyMaskModule} from 'ng2-currency-mask';
import { TransactionShowComponent } from './transaction-show/transaction-show.component';

@NgModule({
  declarations: [
    RebatesWalletComponent,
    OverviewComponent,
    TransactionComponent,
    TransactionCompleteComponent,
    TransactionShowComponent
  ],
  exports: [
    RebatesWalletComponent,
    OverviewComponent,
    TransactionComponent
  ],
  imports: [
    CommonModule,
    UtilsModule,
    PerxRebatesModule,
    MatButtonModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    MatCardModule,
    ProfileServiceModule,
    CurrencyMaskModule,
    TranslateModule.forChild()
  ],
  entryComponents: [
    QrScannerComponent
  ]
})
export class RebatesModule { }
