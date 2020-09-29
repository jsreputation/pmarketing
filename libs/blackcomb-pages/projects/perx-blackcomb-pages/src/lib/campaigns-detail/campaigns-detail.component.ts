import { Component, OnInit } from '@angular/core';
import { IMicrositeSettings, SettingsService } from '@perxtech/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'perx-blackcomb-pages-campaigns-detail',
  templateUrl: './campaigns-detail.component.html',
  styleUrls: ['./campaigns-detail.component.scss']
})
export class CampaignsDetailComponent implements OnInit {
  public settings$: Observable<{ bannerImg?: string, bannerText?: string }>;

  constructor(
    protected settingsService: SettingsService
  ) { }

  public ngOnInit(): void {
    this.settings$ = this.settingsService.getTenantAppSettings('microsite_custom_content').pipe(
      map((settings: IMicrositeSettings) => ({
        bannerImg: <string> settings.jsonValue.campaign_banner,
        bannerText: <string> settings.jsonValue.campaign_description
      }))
    );
  }

}
