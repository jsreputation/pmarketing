import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationModule, CognitoModule, OauthModule, UtilsModule, ProfileModule } from '@perx/core';
import { environment } from '../environments/environment';
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    MatDialogModule,
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
