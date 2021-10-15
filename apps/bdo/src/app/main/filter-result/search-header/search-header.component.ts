import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'bdo-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.scss'],
})
export class SearchHeaderComponent {
  @Input() keyWord = '';
  constructor(private route: Router) {}
  navigateToFilterPage() {
    this.route.navigate(['/filter']);
  }
}
