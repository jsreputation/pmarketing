import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ILoyalty, LoyaltyService, ProfileService, IProfile } from '@perx/core';

import { NoRenewaleInNamePipe } from '../no-renewale-in-name.pipe';
import { ScrollDispatcher, CdkScrollable } from '@angular/cdk/overlay';
// import { delay } from 'rxjs/operators';
import { trigger, transition, animate, style, state } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('optionalDisplay', [
      state("on", style({ top: '0px'})),
      state("off", style({ top: '-500px'})),
      transition('on => off', [
        animate("600ms ease-out", 
          style({ 'margin-top': "{{pixels}}"})
        )
      ], { params: { pixels: "30px" } })
    ]
    )]
})

export class HomeComponent implements OnInit, AfterViewInit {
  value: string = 'on';
  top: number = 0;
  lastOffset: number = 0;
  @ViewChild('contentScrolled', { static: false })
  public contentScrolled: ElementRef;
  public loyalty: ILoyalty;
  public profile: IProfile;

  constructor(
    private noRenewalePipe: NoRenewaleInNamePipe,
    private loyaltyService: LoyaltyService,
    private profileService: ProfileService,
    private scollService: ScrollDispatcher
  ) { }

  public ngOnInit(): void {
    this.loyaltyService.getLoyalty().subscribe((loyalty: ILoyalty) => this.loyalty = loyalty);
    this.profileService.whoAmI().subscribe((p: IProfile) => this.profile = p);
  }

  public getBadge(tier: string | null): string {
    tier = tier !== null ? this.noRenewalePipe.transform(tier.toLowerCase()) : null;

    switch (tier) {
      case 'gold':
        return 'assets/gold-icon.svg';

      case 'platinum':
        return 'assets/plat-icon.svg';

      case 'green':
      default:
        return 'assets/green-icon.svg';
    }
  }
  ngAfterViewInit() {
    this.scollService.scrolled();

    // this.scollService.scrolled().subscribe((data: CdkScrollable) => this.onWindowScroll(data));
    // this.scollService.ancestorScrolled(this.contentScrolled).subscribe((val)=>{
    //   console.log('324', val);
    // })
    this.onWindowScroll({ } as CdkScrollable)
  }
  private onWindowScroll(data: CdkScrollable) {
    if(!data.getElementRef) {
      return ;
    }
    const scrollTop = data.getElementRef().nativeElement.scrollTop || 0;
    const delta = this.lastOffset - scrollTop;
    if (this.top + delta <= 0 && this.top + delta >= -170) {
      this.top = this.top + delta;
    } else if (this.top + delta > 0) {
      this.top = 0;
    } else if (this.top + delta <= -170) {
      this.top = - 170;
    }
    this.lastOffset = scrollTop;

  }
}
