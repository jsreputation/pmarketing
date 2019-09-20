import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService, IVoucherService, Voucher } from '@perx/core';
import { flatMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QRCodeComponent implements OnInit {
  voucher: Voucher;
  constructor(
    private route: ActivatedRoute,
    private notification: NotificationService,
    private vouchersService: IVoucherService
  ) { }

  ngOnInit() {
    this.route.params.pipe(flatMap((param)=>this.vouchersService.get(+param.id))).subscribe((val)=>{
      this.voucher = val;
    }, (msg)=>{
      this.notification.addSnack(msg)
    });
  }
}
