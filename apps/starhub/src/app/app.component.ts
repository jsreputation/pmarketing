import { Component, OnInit } from '@angular/core';
import {
  AuthenticationService,
  NotificationService,
  PopupComponent,
  IPopupConfig,
  // CampaignService,
  // ICampaign,
  ProfileService,
  IProfile
} from '@perx/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService,
    private profileService: ProfileService,
    private activeRoute: ActivatedRoute,
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
          this.notificationService.addPopup({
            title: `Hi ${profile.firstName} ${profile.lastName}`,
            text: `Your user id is ${profile.id}`
          });
        },
        () => {
          this.notificationService.addPopup({
            title: 'Aouch!!!!!',
            text: 'We could not fetch user data, token is wrong or missing'
          });
        }
      );
  }
}
