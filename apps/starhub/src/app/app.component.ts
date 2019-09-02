import { Component, OnInit } from '@angular/core';
import {
  AuthenticationService,
  NotificationService,
  PopupComponent,
  IPopupConfig,
  ProfileService,
  IProfile,
  CampaignService,
  ICampaign,
} from '@perx/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public username: string = 'I do not know who you are!';
  private selectedCampaign: ICampaign;

  constructor(
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService,
    private profileService: ProfileService,
    private activeRoute: ActivatedRoute,
    private campaignService: CampaignService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.notificationService.$popup.subscribe((data: IPopupConfig) => {
      this.dialog.open(PopupComponent, { data });
    });

    this.activeRoute.queryParams.subscribe((params: Params) => {
      if (params.token) {
        this.authenticationService.saveUserAccessToken(params.token);
        this.getCurrent();
      }
    });
  }

  private getCurrent(): void {
    this.profileService.whoAmI()
      .subscribe(
        (profile: IProfile) => {
          this.username = `Hi ${profile.firstName} ${profile.lastName} (id #${profile.id})`;
          this.fetchCampaign();
        },
        () => { }
      );
  }

  private fetchCampaign(): void {
    this.campaignService.getCampaigns()
      .subscribe((campaigns: ICampaign[]) => {
        if (campaigns.length > 0 && campaigns[0].type === 'game') {
          this.selectedCampaign = campaigns[0];
          this.notificationService.addPopup({
            imageUrl: './assets/shake.png',
            text: campaigns[0].name, // You’ve got a “Shake the Tree” reward!
            buttonTxt: 'Play now',
            afterClosedCallBack: this,
          });
        } else {
          this.notificationService.addPopup({
            title: 'Got no campaign',
            text: 'Try again another day'
          });
        }
      });
  }

  dialogClosed(): void {
    this.router.navigate(['/game'], { queryParams: { id: this.selectedCampaign.id } });
  }
}
