import { Component } from '@angular/core';
import { LIST_CATEGORY } from '../../mock-data/categories.mock';

@Component({
  selector: 'bdo-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  categories = LIST_CATEGORY;
}
