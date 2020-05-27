import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Observable } from 'rxjs';

// part of rebates-wallet page
@Component({
  selector: 'perx-core-rebates-list',
  templateUrl: './rebates-list.component.html',
  styleUrls: ['./rebates-list.component.scss']
})
export class RebatesListComponent {
  @Output() public tapped: EventEmitter<any> = new EventEmitter<any>();

  @Input('data') public merchants$: Observable<any[]>;

  public onClick(merchant: any): void {
    this.tapped.emit(merchant);
  }
}
