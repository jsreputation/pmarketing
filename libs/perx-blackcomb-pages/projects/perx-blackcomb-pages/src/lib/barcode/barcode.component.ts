import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { ProfileService, ThemesService, ITheme, ConfigService, IConfig, IProfile } from '@perx/core';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'perx-blackcomb-pages-barcode',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.scss']
})
export class BarcodeComponent implements OnInit {

  public userProfile: IProfile;
  public theme: ITheme;
  public appConfig: IConfig;

  constructor(
    private location: Location,
    private profileService: ProfileService,
    private themesService: ThemesService,
    private configService: ConfigService
  ) { }

  public ngOnInit(): void {

    forkJoin([
      this.themesService.getThemeSetting(),
      this.configService.readAppConfig(),
      this.profileService.whoAmI()
    ]).subscribe(
      ([theme, config, profile]) => {
        this.theme = theme;
        this.appConfig = config;
        this.userProfile = profile;
      }
    );
  }

  public onCancel(): void {
    this.location.back();
  }
}
