import { Component, OnInit } from '@angular/core';
import { ProfileService, IProfile } from '@perx/core/dist/perx-core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile$: Observable<IProfile>;

  constructor(
    private router: Router,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.profile$ = this.profileService.whoAmI();
  }

  onClick(url: string) {
    this.router.navigate([url]);
  }
}
