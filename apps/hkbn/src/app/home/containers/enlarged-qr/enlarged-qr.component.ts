import { Component, OnInit } from '@angular/core';
import { LoyaltyService, ILoyalty } from '@perx/core';

@Component({
  selector: 'hkbn-enlarged-qr',
  templateUrl: './enlarged-qr.component.html',
  styleUrls: ['./enlarged-qr.component.scss']
})
export class EnlargedQrComponent implements OnInit {
  public loyalty: ILoyalty;

  constructor(private loyaltyService: LoyaltyService) { }

  public ngOnInit(): void {
    this.loyaltyService.getLoyalty()
      .subscribe((loyalty: ILoyalty) => this.loyalty = loyalty);
  }
}
