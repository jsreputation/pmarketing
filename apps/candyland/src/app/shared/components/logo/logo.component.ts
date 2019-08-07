import { Component, Input } from '@angular/core';

@Component({
  selector: 'cl-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent  {
  @Input() public sizeClass: string;
}
