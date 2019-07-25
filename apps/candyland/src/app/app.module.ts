import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  MatButtonModule, MatNativeDateModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { MainContainerComponent } from './main-container/main-container.component';
import { SideNavModule } from './shared/components/side-nav/side-nav.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MainContainerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthModule,
    MatButtonModule,
    SideNavModule,
    HttpClientModule,
    MatNativeDateModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
