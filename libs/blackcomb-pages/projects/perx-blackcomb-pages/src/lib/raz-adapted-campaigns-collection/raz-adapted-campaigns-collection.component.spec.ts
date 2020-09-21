import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RazAdaptedCampaignsCollectionComponent } from './raz-adapted-campaigns-collection.component';

describe('RazAdaptedCampaignsCollectionComponent', () => {
  let component: RazAdaptedCampaignsCollectionComponent;
  let fixture: ComponentFixture<RazAdaptedCampaignsCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RazAdaptedCampaignsCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RazAdaptedCampaignsCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
