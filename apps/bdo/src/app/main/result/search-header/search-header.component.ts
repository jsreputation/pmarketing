import { Component, Input } from '@angular/core';

@Component({
  selector: 'bdo-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.scss'],
})
export class SearchHeaderComponent {
  @Input() keyWord;
}
