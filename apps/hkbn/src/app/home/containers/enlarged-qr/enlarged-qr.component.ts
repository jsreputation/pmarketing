import { Component, OnInit } from '@angular/core';
import { LoyaltyService, ILoyalty } from '@perx/core';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'hkbn-enlarged-qr',
  templateUrl: './enlarged-qr.component.html',
  styleUrls: ['./enlarged-qr.component.scss']
})
export class EnlargedQrComponent implements OnInit {
  public loyalty: ILoyalty;
  
  constructor(private loyaltyService: LoyaltyService) { }

  public ngOnInit(): void {
    this.loyaltyService.getLoyalties().pipe(
      filter((loyalties: ILoyalty[]) => loyalties.length > 0),
      map((loyalties: ILoyalty[]) => loyalties[0])
    ).subscribe(
      (loyalty: ILoyalty) => { this.loyalty = loyalty; }
    );
  }
}
