import { Component, OnInit } from '@angular/core';
import { PageAppearence, PageProperties, BarSelectedItem } from '../../page-properties';

@Component({
  selector: 'mc-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, PageAppearence {

  public ngOnInit(): void {
  }

  public getPageProperties(): PageProperties {
    return {
      header: true,
      backButtonEnabled: true,
      bottomSelectedItem: BarSelectedItem.ACCOUNT,
      pageTitle: 'Profile'
    };
  }

}
