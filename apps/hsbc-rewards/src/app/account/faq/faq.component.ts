import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {
  constructor(
    private location: Location
  ) { }

  public closeRedeem(): void {
    return this.location.back();
  }
}
