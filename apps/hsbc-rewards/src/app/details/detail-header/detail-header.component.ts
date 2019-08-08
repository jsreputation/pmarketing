import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail-header',
  templateUrl: './detail-header.component.html',
  styleUrls: ['./detail-header.component.scss']
})
export class DetailHeaderComponent {
  @Input() public customBackButton;
  constructor(
    private location: Location
  ) { }


  back() {
    this.location.back();
  }
}
