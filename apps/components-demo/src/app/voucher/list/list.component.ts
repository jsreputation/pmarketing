import { Component, OnInit } from '@angular/core';
import {
  Observable,
  of
} from 'rxjs';
import { catchError } from 'rxjs/operators';
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
    this.data = this.vouchersService.getAll().pipe(catchError(() => of(mock)));
  }
}
