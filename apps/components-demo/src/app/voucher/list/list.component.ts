import { Component, OnInit } from '@angular/core';
import {
  Observable,
  of
} from 'rxjs';
import { Voucher, VouchersService } from '@perx/core';
import { mock } from '../mock';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public data: Observable<Voucher[]>;

  constructor(private vouchersService: VouchersService) { }

  public ngOnInit(): void {
    this.vouchersService.getAll().subscribe(
      (vouchers) => this.data = of(vouchers),
      () => this.data = of(mock)
    );
  }
}
