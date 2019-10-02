import { NgModule } from '@angular/core';
import { AccountComponent } from './account/account.component';
import { RouterModule } from '@angular/router';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { GameComponent } from './game/game.component';
import { ShakeComponent } from './game/shake/shake.component';
import { TapComponent } from './game/tap/tap.component';

export const components = [
    AccountComponent,
    ContactUsComponent
];

@NgModule({
    declarations: [...components, GameComponent, ShakeComponent, TapComponent],
    exports: [...components],
    imports: [
        RouterModule
    ]
})
export class PagesModule { }
