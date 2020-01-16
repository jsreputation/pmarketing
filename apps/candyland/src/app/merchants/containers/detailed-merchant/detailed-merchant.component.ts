import { Component } from '@angular/core';

@Component({
  selector: 'cl-detailed-merchant',
  templateUrl: './detailed-merchant.component.html',
  styleUrls: ['./detailed-merchant.component.scss']
})
export class DetailedMerchantComponent {
  public merchant: IMerchantFull = {
    id: '1',
    firstName: 'Starbucks',
    lastName: 'Lorem',
    logo: 'assets/images/placeholders/merchants/merchant.png',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
     ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
     fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
      mollit anim id est laborum.`,
    countryCode: '+65',
    phone: '+3555 5556 6666',
    address: '20 Maxwell Road #02-01, Maxwell House, 069113',
    city: 'Singapore',
    state: '-',
    postalCode: '6786546',
    weblink: 'https://www.starbucks.com.sg/',
    branches: [
      {
        id: '1',
        name: 'P.s Cafe at Harding',
        address: '28B Harding Rd, Singapore 249549',
        phone: '9070 8782'
      },
      {
        id: '2',
        name: 'P.s Cafe at Harding',
        address: '28B Harding Rd, Singapore 249549',
        phone: '9070 8782'
      },
      {
        id: '3',
        name: 'P.s Cafe at Harding',
        address: '28B Harding Rd, Singapore 249549',
        phone: '9070 8782'
      }
    ]
  };

  public edit(): void {

  }

  public close(): void {

  }

}
