import { Component, OnInit } from '@angular/core';
import { IProfile, ProfileService } from '@perxtech/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public profile$: Observable<IProfile>;
  constructor(
    private profileService: ProfileService
  ) { }

  public ngOnInit(): void {
    this.profile$ = this.profileService.whoAmI();
  }

}
