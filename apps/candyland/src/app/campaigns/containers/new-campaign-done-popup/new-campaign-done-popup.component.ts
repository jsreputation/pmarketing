import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'cl-new-campaign-done-popup',
  templateUrl: './new-campaign-done-popup.component.html',
  styleUrls: ['./new-campaign-done-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCampaignDonePopupComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  /* To copy Text from Textbox */
  copyInputMessage(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  /* To copy any Text */
  copyText(val: string){
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
