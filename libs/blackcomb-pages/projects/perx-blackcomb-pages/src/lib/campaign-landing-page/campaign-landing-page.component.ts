import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Params,
  Router
} from '@angular/router';
import {
  CampaignLandingPage,
  ConfigService,
  ICampaign,
  ICampaignService,
  IConfig,
  ITheme,
  ThemesService,
} from '@perxtech/core';
import { Subject } from 'rxjs';
import {
  filter,
  flatMap,
  map,
  switchMap,
  tap
} from 'rxjs/operators';
import { oc } from 'ts-optchain';

@Component({
  selector: 'perx-blackcomb-pages-campaign-landing-page',
  templateUrl: './campaign-landing-page.component.html',
  styleUrls: ['./campaign-landing-page.component.scss'],
})
export class CampaignLandingPageComponent implements OnInit, OnDestroy {
  public campaign: ICampaign | undefined;
  public config: CampaignLandingPage | undefined;
  public backgroundUrl: string = '';
  private destroy$: Subject<void> = new Subject();
  public buttonStyle: { [key: string]: string } = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private campaignService: ICampaignService,
    private configService: ConfigService,
    private themesService: ThemesService,
    private router: Router
  ) {}

  public ngOnInit(): void {

    this.configService
      .readAppConfig<ITheme>()
      .pipe(
        flatMap((config: IConfig<ITheme>) =>
          this.themesService.getThemeSetting(config)
        ),
        tap((theme: ITheme) => {
          this.buttonStyle['background-color'] = theme.properties[
            '--button_background_color'
          ]
            ? theme.properties['--button_background_color']
            : '';
          this.buttonStyle.color = theme.properties['--button_text_color']
            ? theme.properties['--button_text_color']
            : '';
        }),
        switchMap(() => this.activatedRoute.params),
        filter((params: Params) => params.cid),
        map((params: Params) => Number.parseInt(params.cid, 10)),
        switchMap((id) => this.campaignService.getCampaign(id))
      )
      .subscribe((campaign) => {
        this.campaign = campaign;
        this.config = oc(campaign).displayProperties.landingPage();
        this.backgroundUrl = oc(this.config).backgroundUrl('');
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public next(): void {
    if (this.campaign) {
      if (this.campaign.subType === 'quiz') {
        this.router.navigate([`quiz/${this.campaign.id}`]);
        return;
      }
      if (this.campaign.subType === 'survey') {
        this.router.navigate([`survey/${this.campaign.id}`]);
        return;
      }

      this.router.navigate([`${this.campaign.type}/${this.campaign.id}`]);
    }
  }
}
