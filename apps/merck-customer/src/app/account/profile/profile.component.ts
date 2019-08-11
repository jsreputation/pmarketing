import { Component, OnInit } from '@angular/core';
import { BarSelectedItem } from 'src/app/page-properties';

@Component({
  selector: 'mc-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public ngOnInit(): void {
  }

  public showHeader(): boolean {
    return false;
  }

  public backButtonEnabled(): boolean {
    return true;
  }

  public bottomSelectedItem(): BarSelectedItem {
    return BarSelectedItem.ACCOUNT;
  }

}
