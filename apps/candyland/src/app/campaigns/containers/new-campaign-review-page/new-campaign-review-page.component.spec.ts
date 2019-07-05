import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCampaignReviewPageComponent } from './new-campaign-review-page.component';

describe('NewCampaignReviewPageComponent', () => {
  let component: NewCampaignReviewPageComponent;
  let fixture: ComponentFixture<NewCampaignReviewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCampaignReviewPageComponent ]
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
