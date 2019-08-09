import { Component, OnInit } from '@angular/core';
import { ProfileService, IProfile, AuthenticationService } from '@perx/core';
import { BarSelectedItem } from '../page-properties';
import { Router } from '@angular/router';

@Component({
  selector: 'mc-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  public profile: IProfile;

  constructor(
    private profileService: ProfileService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.profileService.whoAmI().subscribe(res => {
      this.profile = res;
    });
  }

  public showHeader(): boolean {
    return true;
  }

  public bottomSelectedItem(): BarSelectedItem {
    return BarSelectedItem.ACCOUNT;
  }

  public backButtonEnabled(): boolean {
    return false;
  }

  public onLogout(): void {
    this.authenticationService.logout();
    this.router.navigate(['login']);
  }

  public onAccountScreenNavigate(path: string): void {
    this.router.navigate([path]);
  }

}
