import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  AuthenticationModule,
  CognitoModule,
  OauthModule,
  PopupComponent,
  UtilsModule,
} from '@perx/core/dist/perx-core';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { MatDialogModule } from '@angular/material';
import { ContentContainerModule } from './ui/content-container/content-container.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AuthModule,
    AuthenticationModule,
    OauthModule.forRoot({env: environment}),
    CognitoModule.forRoot({env: environment}),
    UtilsModule,
    HttpClientModule,
    MatDialogModule,
    AppRoutingModule,
    ContentContainerModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    PopupComponent
  ]
})
export class AppModule {
}
