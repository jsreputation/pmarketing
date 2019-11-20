import { Component, Input } from '@angular/core';

@Component({
  selector: 'cs-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent  {
  @Input() public sizeClass: string;
}
