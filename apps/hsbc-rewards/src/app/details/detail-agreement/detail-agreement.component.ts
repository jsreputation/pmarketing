import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-detail-agreement',
  templateUrl: './detail-agreement.component.html',
  styleUrls: ['./detail-agreement.component.scss']
})
export class DetailAgreementComponent {
  @Output() public close = new EventEmitter<void>();

  constructor() { }
  public closeAgreement() {
    this.close.emit();
  }
}
