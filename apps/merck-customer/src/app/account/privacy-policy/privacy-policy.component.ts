import { Component, OnInit } from '@angular/core';
import { PageAppearence, PageProperties, BarSelectedItem } from '../../page-properties';

@Component({
  selector: 'mc-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit, PageAppearence {

  public ngOnInit(): void {
  }

  public getPageProperties(): PageProperties {
    return {
      header: true,
      backButtonEnabled: true,
      bottomSelectedItem: BarSelectedItem.ACCOUNT,
      pageTitle: 'STATIC_PRIVACY_POLICY'
    };
  }
}
