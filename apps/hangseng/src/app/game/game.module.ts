import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  GameModule as PerxGameModule
} from '@perxtech/core';
import { GameModule as BCGameModule } from '@perxtech/blackcomb-pages';
import { EnrollGameButtonComponent } from './enroll-game-button/enroll-game-button.component';
import { GameComponent } from './game.component';


const routes: Routes = [{
  path: '',
  component: GameComponent
}];

@NgModule({
  declarations: [GameComponent, EnrollGameButtonComponent],
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule,
    BCGameModule,
    RouterModule.forChild(routes),
    TranslateModule,
    PerxGameModule
  ]
})
export class GameModule { }
