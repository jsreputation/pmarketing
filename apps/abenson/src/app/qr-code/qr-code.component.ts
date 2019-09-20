import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService, IVoucherService, Voucher } from '@perx/core';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QRCodeComponent implements OnInit {
  public voucher: Voucher;
  constructor(
    private route: ActivatedRoute,
    private notification: NotificationService,
    private vouchersService: IVoucherService
  ) { }

  public ngOnInit(): void {
    this.route.params.pipe(flatMap((param) => this.vouchersService.get(+param.id))).subscribe((val) =>
      this.voucher = val
      , (msg) =>
        this.notification.addSnack(msg));
  }
}
