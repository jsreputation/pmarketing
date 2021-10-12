import { Component, Input } from '@angular/core';

@Component({
  selector: 'bdo-every-day',
  templateUrl: './every-day.component.html',
  styleUrls: ['./every-day.component.scss']
})
export class EverydayComponent {
  @Input() title:string;
  @Input() description:string;
  
}
