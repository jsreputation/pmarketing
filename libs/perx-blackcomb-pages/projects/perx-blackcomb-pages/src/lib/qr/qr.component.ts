import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { ProfileService, ThemesService, ITheme, ConfigService, IConfig } from '@perx/core';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'perx-blackcomb-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss']
})
export class QRComponent implements OnInit {

  public rewardDetails: string | null = null;
  public rewardId: number | null = null;
  public theme: ITheme;
  public appConfig: IConfig<void>;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private profileService: ProfileService,
    private themesService: ThemesService,
    private configService: ConfigService
  ) { }

  public ngOnInit(): void {
    this.themesService.getThemeSetting().subscribe(
      theme => this.theme = theme
    );

    this.configService.readAppConfig<void>().subscribe(
      (config: IConfig<void>) => this.appConfig = config
    );

    this.route.paramMap.pipe(
      filter((params: ParamMap) => params.has('rewardId')),
      map((params: ParamMap) => params.get('rewardId')),
      map((id: string) => Number.parseInt(id, 10))
    ).subscribe((id: number) => this.rewardId = id);

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
