import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCampaignSelectTemplatePageComponent } from './new-campaign-select-template-page.component';

describe('NewCampaignSelectTemplatePageComponent', () => {
  let component: NewCampaignSelectTemplatePageComponent;
  let fixture: ComponentFixture<NewCampaignSelectTemplatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCampaignSelectTemplatePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCampaignSelectTemplatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
