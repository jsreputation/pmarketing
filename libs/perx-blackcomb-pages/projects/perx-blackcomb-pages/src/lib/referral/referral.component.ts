import { Component } from '@angular/core';
import { NotificationService } from '@perxtech/core';

@Component({
  selector: 'perx-blackcomb-pages-referral',
  templateUrl: './referral.component.html',
  styleUrls: ['./referral.component.scss']
})
export class ReferralComponent {
  // todo to be replaced with the proper content when api is available
  public tnc: string = `For each successful sign up* using your referral code, you earn extra 5X lucky draw chance. Your referee will earn 3X lucky draw chances.
  <br/>  <br/>
  Share your referral code with a friend today!<br/>
  *Both you and your referee will have to complete at least 1 quiz to earn your lucky draw chances.<br/>`;
  // todo to be replaced with the proper content when api is available
  public code: string = 'LASTNAME1234';
  // todo to be replaced with the proper content when api is available
  public shareText: string = 'Join me in this game by signing up using my referral code “LASTNAME1234” so that you and I can earn extra lucky draw chances! http://www.linktothiscampaign.com';
  // todo to be replaced with the proper content when api is available
  public shareTitle: string = 'Join me in this game';
  // todo to be replaced with the proper content when api is available
  public shareUrl: string = 'http://www.linktothiscampaign.com';

  constructor(private notificationService: NotificationService) { }

  public share(): void {
    // @ts-ignore
    if (navigator.share) {
      const data = {
        url: this.shareUrl,
        text: this.shareText,
        title: this.shareTitle
      };
      // @ts-ignore
      navigator.share(data)
        .then(() => { })
        .catch(() => {
          console.log('failed to use share, falling back to clipboard');
          this.copy();
        });
    } else {
      console.log('no access to share api, falling back to clipboard');
      this.copy();
    }
  }

  public copy(): void {
    navigator.clipboard.writeText(this.shareText)
      .then(() => this.notificationService.addSnack('Copied to your clipboard!'))
      .catch(() => this.notificationService.addSnack('Could not access your clipboard'));
  }
}
