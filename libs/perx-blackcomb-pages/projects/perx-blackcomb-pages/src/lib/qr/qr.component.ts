import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ProfileService } from '@perx/core';

@Component({
  selector: 'perx-blackcomb-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss']
})
export class QRComponent implements OnInit {

  public rewardDetails: string = null;
  public rewardId: number = null;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private profileService: ProfileService
  ) { }

  public ngOnInit(): void {
    this.rewardId = +this.route.snapshot.paramMap.get('rewardId');

    this.profileService.whoAmI().subscribe(
      (profile) => {
        this.rewardDetails = JSON.stringify(
          {
            id: profile.id,
            name: profile.lastName,
            identifier: profile.identifier
          });
      }
    );
  }

  public onCancel(): void {
    this.location.back();
  }
}
