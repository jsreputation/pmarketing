import { Component, OnInit } from '@angular/core';
import { ProfileService, IProfile } from '@perx/core';
import { Router } from '@angular/router';

@Component({
  selector: 'perx-blackcomb-pages-profile',
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
    this.profileService.whoAmI().subscribe(res => this.profile = res );
  }

  public onEditPasswordClicked(): void {
    this.router.navigateByUrl('change-password');
  }

  public onEditEmailClicked(): void {
    console.log('Email clicked');
  }

  public onEditPostcodeClicked(): void {
    console.log('Post code clicked');
  }
}
