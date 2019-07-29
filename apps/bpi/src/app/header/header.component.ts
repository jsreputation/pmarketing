import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() public title: string;
  @Input() public subTitles: string[];
  @Input() public subsubTitles: string[];
}
