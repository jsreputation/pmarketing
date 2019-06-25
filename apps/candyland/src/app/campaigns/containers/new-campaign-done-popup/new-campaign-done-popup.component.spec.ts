import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCampaignDonePopupComponent } from './new-campaign-done-popup.component';

describe('NewCampaignDonePopupComponent', () => {
  let component: NewCampaignDonePopupComponent;
  let fixture: ComponentFixture<NewCampaignDonePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCampaignDonePopupComponent ]
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
