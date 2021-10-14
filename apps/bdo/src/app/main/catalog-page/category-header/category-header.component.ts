import { Component, Input } from '@angular/core';

@Component({
  selector: 'bdo-category-header',
  templateUrl: './category-header.component.html',
  styleUrls: ['./category-header.component.scss']
})
export class CategoryHeaderComponent {
  @Input() title:string;
  @Input() description:string;
  
}
