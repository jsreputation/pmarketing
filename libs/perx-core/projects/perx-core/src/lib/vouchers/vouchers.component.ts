import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { VouchersService } from './vouchers.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'perx-core-vouchers',
  templateUrl: './vouchers.component.html',
  styleUrls: ['./vouchers.component.scss']
})
export class VouchersComponent implements OnInit {
  @Output() route: EventEmitter<number | string> = new EventEmitter<number | string>();

  vouchers$: Observable<{ id: number, name: string }[]>;

  constructor(
    private vouchersService: VouchersService
  ) { }

  ngOnInit() {
    this.vouchers$ = this.vouchersService.getAll();
  }

  onClick(id: number | string) {
    this.route.emit(id);
  }
}
