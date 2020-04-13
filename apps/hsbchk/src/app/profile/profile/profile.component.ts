import { Component, OnInit } from '@angular/core';
import {IProfile, ProfileService} from '@perxtech/core';
import {Router} from '@angular/router';
import {oc} from 'ts-optchain';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public profile: IProfile;

  constructor(
    private profileService: ProfileService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.profileService.whoAmI().subscribe(res => {
      this.profile = res;
    });
  }

  public onEditPasswordClicked(): void {
    this.router.navigateByUrl('change-password');
  }

  public onEditEmailClicked(): void {
    this.router.navigateByUrl('edit-profile/email');
  }

  public onEditPostcodeClicked(): void {
    this.router.navigateByUrl('edit-profile/postcode');
  }

  public onEditOptInClicked(): void {
    this.router.navigateByUrl('lucky-draw-details');
  }

  public get getOptIn(): string {
    return Boolean(oc(this.profile).customProperties.fullName(''))
    && Boolean(oc(this.profile).customProperties.hkid('')) ?
      'Yes' : 'No';
  }

}
