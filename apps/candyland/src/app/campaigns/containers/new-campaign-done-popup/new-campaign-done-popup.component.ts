import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MessageService } from '@cl-core-services';

export interface NewCampaignDonePopupComponentData {
  title: string;
  subTitle?: string;
  copyMessage?: string;
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
  ) { }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public copyMessage(): void {
    const copyMessage = ('copyMessage' in this.data) ? this.data.copyMessage : 'Link copied';
    this.messageService.show(copyMessage, 'success');
  }
}
