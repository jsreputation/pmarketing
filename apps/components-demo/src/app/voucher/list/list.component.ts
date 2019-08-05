import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Voucher } from '@perx/core';
import { mock } from '../mock';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public data: Observable<Voucher[]>;

  public ngOnInit(): void {
    this.data = of(mock);
  }
}
