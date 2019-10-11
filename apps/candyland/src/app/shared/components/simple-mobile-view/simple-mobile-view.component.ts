import { Component, Input } from '@angular/core';

@Component({
  selector: 'cl-simple-mobile-view',
  templateUrl: './simple-mobile-view.component.html',
  styleUrls: ['./simple-mobile-view.component.scss']
})
export class SimpleMobileViewComponent {
  @Input() public background: string = 'assets/images/reward/card-background/card-bg-1.png';
  @Input() public mobileImageClass: string = 'mobile-preview-mobile';
  @Input() public headerColor: string = '#ffffff';
  @Input() public logo: string;
  @Input() public logoType: boolean;
  @Input() public fontFamily: string;
}
