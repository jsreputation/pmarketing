import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignStampsComponent } from './campaign-stamps.component';

describe('CampaignStampsComponent', () => {
  let component: CampaignStampsComponent;
  let fixture: ComponentFixture<CampaignStampsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignStampsComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignStampsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
