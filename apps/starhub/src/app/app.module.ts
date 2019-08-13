import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationModule, CognitoModule, OauthModule } from '@perx/core';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    CognitoModule.forRoot({env: environment}),
    OauthModule.forRoot({env: environment}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
