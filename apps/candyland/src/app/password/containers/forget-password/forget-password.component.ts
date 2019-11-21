import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Location} from '@angular/common';

interface StateObjIntf  {
  id: string;
  user: string;
  navigationId: number;
}

@Component({
  selector: 'perx-blackcomb-pages-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements AfterViewInit {
  @ViewChild('accountid', {static: false})
  public accountIdInput: ElementRef;

  @ViewChild('username', {static: false})
  public usernameInput: ElementRef;

  constructor(private location: Location) { }

  public ngAfterViewInit(): void {
    const state = this.location.getState() as StateObjIntf;
    this.accountIdInput.nativeElement.value = state.id || '';
    this.usernameInput.nativeElement.value = state.user || '';
  }

}
