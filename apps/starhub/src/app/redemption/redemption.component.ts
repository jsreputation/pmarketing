import { Component, OnInit, ViewChild } from '@angular/core';
import { Voucher, VoucherState, VouchersService, PinService, PinInputComponent } from '@perx/core';
import { ActivatedRoute, Params } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-redemption',
  templateUrl: './redemption.component.html',
  styleUrls: ['./redemption.component.scss']
})
export class RedemptionComponent implements OnInit {

  public voucher: Voucher;
  public showEnterPinComponent: boolean = false;
  public isPinEntered: boolean = false;
  public isPinCorrect: boolean;

 @ViewChild('pinInput', {static: false})
  private pinInputComponent: PinInputComponent;

  private generatedPin: string;

  constructor(
    private vouchersService: VouchersService,
    private pinService: PinService,
    private activeRoute: ActivatedRoute,
    private location: Location) {
  }

  public ngOnInit(): void {
    this.activeRoute.queryParams
      .pipe(
        filter((params: Params) => params.id ? true : false),
        map((params: Params) => params.id),
        switchMap((id: number) => this.vouchersService.get(id))
      )
      .subscribe((voucher: Voucher) => {
        this.voucher = voucher;
      });
  }

  public back(): void {
    this.location.back();
  }

  public showPinComponent(): void {
    this.pinService.getPin(this.voucher.id).subscribe(
      (pin: string) => {
        this.generatedPin = pin;
        this.showEnterPinComponent = true;
      }
    );
  }

  public onPinEntered(enteredPin: string): void {
    this.isPinEntered = true;
    this.isPinCorrect = enteredPin === this.generatedPin;

    // TODO: Added following condition for UI cases demo.
    if (this.isPinCorrect) {
      this.voucher.state = VoucherState.redeemed;
    }
  }

  public tryAgainClicked(): void {
    this.isPinEntered = false;
    this.pinInputComponent.resetAll();
  }

  public cancelClicked(): void {
    this.location.back();
  }
}
