import { Component } from '@angular/core';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { EnterPinComponent } from './enter-pin/enter-pin.component';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'mc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public showHeader: boolean = false;

  public onActivate(ref: any): void {
    this.showHeader =
      ref instanceof ForgotPasswordComponent ||
      ref instanceof EnterPinComponent ||
      ref instanceof HomeComponent;
  }
}
