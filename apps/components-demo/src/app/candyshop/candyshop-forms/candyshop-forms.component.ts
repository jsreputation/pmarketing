import { Component } from '@angular/core';

@Component({
  selector: 'app-candyshop-forms',
  templateUrl: './candyshop-forms.component.html',
  styleUrls: ['./candyshop-forms.component.scss']
})
export class CandyshopFormsComponent {
  public statistics: { type: string, value: number }[] = [
    {type: 'first', value: 200},
    {type: 'second', value: 500},
    {type: 'third', value: 34534},
  ];

  public shortcodes: any[] = [
    {title: 'Campaign Url', value: '[campaignUrl]'},
    {title: 'User ID', value: '[userId]'},
    {title: 'First name', value: '[userFirstName]'},
    {title: 'Last name', value: '[userLastName]'},
    {title: 'Salutation', value: '[salutation]'},
  ];

  public log(message: any): void {
    alert(message);
  }
}
