import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatChipsModule } from '@angular/material/chips';
import { ICampaignService } from '@perxtech/core';
import { of } from 'rxjs';

import { HomeMissionComponent } from './home-mission.component';

describe('HomeMissionComponent', () => {
  let component: HomeMissionComponent;
  let fixture: ComponentFixture<HomeMissionComponent>;

  const campaignServiceStub: Partial<ICampaignService> = {
    getCategories: () => of([]),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeMissionComponent],
      imports: [MatChipsModule],
      providers: [
        {
          provide: ICampaignService,
          useValue: campaignServiceStub,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
