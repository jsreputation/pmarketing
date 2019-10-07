import { Component, OnInit } from '@angular/core';
import { ProfileService } from '@perx/core';
@Component({
  selector: 'perx-blackcomb-pages-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.profileService.whoAmI().subscribe(()=>console.log('1'));
  }

}
