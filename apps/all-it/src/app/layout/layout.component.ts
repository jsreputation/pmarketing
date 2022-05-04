import { LayoutComponent as BCPLayoutComponent } from '@perxtech/blackcomb-pages';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Config, ConfigService, ILoyalty, LoyaltyService, SettingsService, ThemesService } from '@perxtech/core';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';

@Component({
  selector: 'all-it-layout',
  templateUrl: './layout.component.html',
  styleUrls: [ './layout.component.scss' ]
})
export class LayoutComponent extends BCPLayoutComponent implements OnInit {
  public isPremiumMember: boolean = false;

  constructor(
    location: Location,
    router: Router,
    route: ActivatedRoute,
    themesService: ThemesService,
    titleService: Title,
    cd: ChangeDetectorRef,
    config: Config,
    configService: ConfigService,
    settingsService: SettingsService,
    private loyaltyService: LoyaltyService,
  ) {
    super(location, router, route, themesService, titleService, cd, config, configService, settingsService);
  }

  public ngOnInit(): void {
    super.ngOnInit();

    this.loyaltyService.getLoyalty().subscribe((loyalty: ILoyalty) => {
      if (loyalty && loyalty.tiers) {
        this.isPremiumMember = loyalty.tiers.filter((tier) => tier.name === 'Premium').length > 0;
      }
    })
  }

}
