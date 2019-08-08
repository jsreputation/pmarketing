import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail-header',
  templateUrl: './detail-header.component.html',
  styleUrls: ['./detail-header.component.scss']
})
export class DetailHeaderComponent {
  @Input() public customBackButton: string;
  constructor(
    private location: Location
  ) { }

  public back(): void {
    this.location.back();
  }
}
