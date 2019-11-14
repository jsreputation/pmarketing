import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ProfileService, ThemesService, ITheme } from '@perx/core';

@Component({
  selector: 'perx-blackcomb-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss']
})
export class QRComponent implements OnInit {

  public rewardDetails: string = null;
  public rewardId: number = null;
  public theme: ITheme;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private profileService: ProfileService,
    private themesService: ThemesService,
  ) { }

  public ngOnInit(): void {
    this.themesService.getThemeSetting().subscribe(
      theme => this.theme = theme
    );

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
