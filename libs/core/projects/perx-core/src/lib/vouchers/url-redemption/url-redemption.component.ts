import { Component, OnInit, Input } from '@angular/core';
import { NotificationService } from '../../utils/notification/notification.service';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'perx-core-url-redemption',
  templateUrl: './url-redemption.component.html',
  styleUrls: ['./url-redemption.component.scss']
})
export class UrlRedemptionComponent implements OnInit {

  @Input()
  public instructions: string;

  @Input()
  public url: string;

  private copyToClipboardTxt: string;
  private clipboardErrorTxt: string;

  constructor(private notificationService: NotificationService,
              private location: Location,
              private translateService: TranslateService) { }

  public ngOnInit(): void {
    this.initTranslate();
  }

  public copy(code: string): void {
    navigator.clipboard
      .writeText(code)
      .then(() => this.notificationService.addSnack(this.copyToClipboardTxt))
      .catch(() => this.notificationService.addSnack(this.clipboardErrorTxt));
  }

  private initTranslate(): void {
    this.translateService
      .get([
        'REDEMPTION.COPY_TO_CLIPBOARD',
        'REDEMPTION.CLIPBOARD_ERROR_TXT',
      ])
      .subscribe((res: any) => {
        this.copyToClipboardTxt = res['REDEMPTION.COPY_TO_CLIPBOARD'];
        this.clipboardErrorTxt = res['REDEMPTION.CLIPBOARD_ERROR_TXT'];
      });
  }

  public goBack(): void {
    this.location.back();
  }

}
