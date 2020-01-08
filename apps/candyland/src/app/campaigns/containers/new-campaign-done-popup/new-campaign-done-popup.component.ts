import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MessageService } from '@cl-core-services';
import { TranslateService } from '@ngx-translate/core';

export interface NewCampaignDonePopupComponentData {
  title: string;
  subTitle?: string;
  type?: string;
  url?: string;
  img?: string;
}

@Component({
  selector: 'cl-new-campaign-done-popup',
  templateUrl: './new-campaign-done-popup.component.html',
  styleUrls: ['./new-campaign-done-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCampaignDonePopupComponent {
  constructor(
    public dialogRef: MatDialogRef<NewCampaignDonePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewCampaignDonePopupComponentData,
    private messageService: MessageService,
    private translate: TranslateService
  ) { }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public copyMessage(): void {
    const copyMessage = this.translate.instant('CAMPAIGN.COPY_MESSAGE');
    this.messageService.show(copyMessage, 'success');
  }
}
