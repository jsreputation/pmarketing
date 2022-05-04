import { Component, OnInit, Input, } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { BarcodeFormat } from '@zxing/library';
import {Location} from '@angular/common';

@Component({
  selector: 'perx-bcm-pages-qrscanner',
  templateUrl: './qrscanner.component.html',
  styleUrls: ['./qrscanner.component.scss']
})
export class QrscannerComponent implements OnInit {
  private path: string;
  public allowedFormats: BarcodeFormat[] = [ BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13,
    BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX];

  @Input()
  public enableScan: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.path = params.path;
    });
  }

  public scanSuccessHandler(data: string): void {
    if ( !data ) {
      return;
    }
    const navigationExtras: NavigationExtras = {
      state: {
        data
      }
    };
    this.router.navigate([`${this.path}`], navigationExtras);
  }

  public onCancel(): void {
   this.location.back();
  }

}
