import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCampaignDonePopupComponent } from './new-campaign-done-popup.component';
// tslint:disable
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { MessageService } from '@cl-core-services';

describe('NewCampaignDonePopupComponent', () => {
  let component: NewCampaignDonePopupComponent;
  let fixture: ComponentFixture<NewCampaignDonePopupComponent>;
  const messageServiceStub: Partial<MessageService> = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        TranslateModule.forRoot()
      ],
      providers: [
        {provide: MessageService, useValue: messageServiceStub},
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: []}
      ],
      declarations: [NewCampaignDonePopupComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCampaignDonePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
