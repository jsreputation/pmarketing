import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ILoyalty, LoyaltyService, ProfileService, IProfile } from '@perx/core';
import { NoRenewaleInNamePipe } from '../no-renewale-in-name.pipe';
import { ScrollDispatcher, CdkScrollable } from '@angular/cdk/overlay';
import { MatToolbar } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild(MatToolbar, { static: false}) 
  private toolBar: MatToolbar;
  public top: number = 0;
  public lastOffset: number = 0;
  @ViewChild('contentScrolled', { static: false })
  public contentScrolled: ElementRef;
  public loyalty: ILoyalty;
  public profile: IProfile;

  constructor(
    private noRenewalePipe: NoRenewaleInNamePipe,
    private loyaltyService: LoyaltyService,
    private profileService: ProfileService,
    private scollService: ScrollDispatcher,
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

  public ngAfterViewInit(): void {
    this.scollService.scrolled().subscribe((data: CdkScrollable) => this.onWindowScroll(data));
  }

  private onWindowScroll(data: CdkScrollable) {
    const scrollTop = data.getElementRef().nativeElement.scrollTop || 0;
    requestAnimationFrame(()=>{
      const delta = this.lastOffset - scrollTop;
      if (this.top + delta <= 0 && this.top + delta >= -170) {
        this.top = this.top + delta;
      } else if (this.top + delta > 0) {
        this.top = 0;
      } else if (this.top + delta <= -170) {
        this.top = - 170;
      }
      this.lastOffset = scrollTop;
      this.toolBar._elementRef.nativeElement.style.transform = `translateY(${this.top}px)`;
    })
  }
}
