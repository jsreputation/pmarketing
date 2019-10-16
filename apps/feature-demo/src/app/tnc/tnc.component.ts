import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tnc',
  templateUrl: './tnc.component.html',
  styleUrls: ['./tnc.component.scss']
})
export class TncComponent {
  constructor(private location: Location) {
  }

  public back(): void {
    this.location.back();
  }
}
