import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PerxCoreModule } from '@perx/core/dist/perx-core';
import { GameComponent } from './game/game.component';

import { MatToolbarModule, MatButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CongratsComponent } from './congrats/congrats.component';
import { HeaderComponent } from './header/header.component';
import { ShakeGameComponent } from './shake-game/shake-game.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    CongratsComponent,
    HeaderComponent,
    ShakeGameComponent
  ],
  imports: [
    BrowserModule,
    PerxCoreModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
