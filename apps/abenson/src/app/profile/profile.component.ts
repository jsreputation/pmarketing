import { Component, OnInit } from '@angular/core';
import { IProfile, ProfileService } from '@perx/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile$: Observable<IProfile>
  constructor(
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.profile$ = this.profileService.whoAmI();
  }

}
