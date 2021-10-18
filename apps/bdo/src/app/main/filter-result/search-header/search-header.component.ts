import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'bdo-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.scss'],
})
export class SearchHeaderComponent {
  @Input() keyWord = '';
  @Output() loadFilter: EventEmitter<any> = new EventEmitter();
  filter() {
    this.loadFilter.emit();
  }
}
