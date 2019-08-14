import { Component, OnInit } from '@angular/core';
import {
  AuthenticationService,
  NotificationService,
  PopupComponent,
  IPopupConfig,
  ProfileService,
  IProfile,
  CampaignService,
  ICampaign
} from '@perx/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public username: string = 'I do not know who you are!';
  constructor(
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService,
    private profileService: ProfileService,
    private activeRoute: ActivatedRoute,
    private campaignService: CampaignService,
    private dialog: MatDialog
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
        if (campaigns.length > 0) {
          this.notificationService.addPopup({
            title: 'Got some campaign',
            text: campaigns[0].name
          });
        } else {
          this.notificationService.addPopup({
            title: 'Got no campaign',
            text: 'Try again another day'
          });
        }
      });
  }
}
