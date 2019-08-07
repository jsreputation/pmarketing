import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'cl-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFilterComponent {
  @Input() public control: FormControl;
  @Input() public placeholder: string =  'Search for engagements';
}
