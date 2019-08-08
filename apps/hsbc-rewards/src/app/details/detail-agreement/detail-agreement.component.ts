import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-detail-agreement',
  templateUrl: './detail-agreement.component.html',
  styleUrls: ['./detail-agreement.component.scss']
})
export class DetailAgreementComponent {
  @Output() public closeModal: EventEmitter<void> = new EventEmitter<void>();

  public closeAgreement(): void {
    this.closeModal.emit();
  }
}
