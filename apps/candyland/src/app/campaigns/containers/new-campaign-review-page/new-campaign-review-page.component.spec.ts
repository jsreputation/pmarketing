import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCampaignReviewPageComponent } from './new-campaign-review-page.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('NewCampaignReviewPageComponent', () => {
  let component: NewCampaignReviewPageComponent;
  let fixture: ComponentFixture<NewCampaignReviewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCampaignReviewPageComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCampaignReviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
