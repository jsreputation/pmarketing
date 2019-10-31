import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignNotCompletedFormGroupComponent } from './campaign-not-completed-form-group.component';

describe('CampaignNotCompletedFormGroupComponent', () => {
  let component: CampaignNotCompletedFormGroupComponent;
  let fixture: ComponentFixture<CampaignNotCompletedFormGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignNotCompletedFormGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignNotCompletedFormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
