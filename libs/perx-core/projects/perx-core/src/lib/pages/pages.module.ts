import { NgModule } from '@angular/core';
import { AccountComponent } from './account/account.component';
import { RouterModule } from '@angular/router';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { GameComponent } from './game/game.component';
import { ShakeComponent } from './game/shake/shake.component';
import { TapComponent } from './game/tap/tap.component';
import { HistoryComponent } from './history/history.component';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material';
import { GameModule } from '../game/game.module';
import { VouchersModule } from '../vouchers/vouchers.module';

export const components = [
    AccountComponent,
    ContactUsComponent
];

@NgModule({
    declarations: [...components, GameComponent, ShakeComponent, TapComponent, HistoryComponent],
    exports: [...components],
    imports: [
        RouterModule,
        CommonModule,
        MatProgressBarModule,
        GameModule,
        VouchersModule
    ]
})
export class PagesModule { }
