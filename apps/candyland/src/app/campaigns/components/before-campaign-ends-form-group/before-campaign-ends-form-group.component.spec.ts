import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeforeCampaignEndsFormGroupComponent } from './before-campaign-ends-form-group.component';

describe('BeforeCampaignEndsFormGroupComponent', () => {
  let component: BeforeCampaignEndsFormGroupComponent;
  let fixture: ComponentFixture<BeforeCampaignEndsFormGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeforeCampaignEndsFormGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeforeCampaignEndsFormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
