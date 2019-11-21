import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardDetailsComponent } from './reward-details.component';
import { RewardsModule, RewardsService, ThemesService } from '@perx/core';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

describe('RewardComponent', () => {
  let component: RewardDetailsComponent;
  let fixture: ComponentFixture<RewardDetailsComponent>;
  const rewardsServiceStub: Partial<RewardsService> = {};
  const themeServiceStub: Partial<ThemesService> = {
    getThemeSetting: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RewardDetailsComponent],
      imports: [
        RewardsModule,
        RouterTestingModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: RewardsService, useValue: rewardsServiceStub },
        { provide: ThemesService, useValue: themeServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
