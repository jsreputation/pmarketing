import { Component, Input } from '@angular/core';

@Component({
  selector: 'cl-simple-mobile-view',
  templateUrl: './simple-mobile-view.component.html',
  styleUrls: ['./simple-mobile-view.component.scss']
})
export class SimpleMobileViewComponent {
  @Input() public background = 'assets/images/reward/card-background/card-bg-1.png';
  @Input() public mobileImageClass = 'mobile-preview-mobile';
  @Input() public headerColor = '#ffffff';
  @Input() public logo: string;
  @Input() public logoType: boolean;
  @Input() public fontFamily: string;

}
