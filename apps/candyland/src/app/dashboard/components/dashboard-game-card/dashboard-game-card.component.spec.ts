import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardGameCardComponent } from './dashboard-game-card.component';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { CreateEngagementPopupModule } from '@cl-shared/containers/create-engagement-popup/create-engagement-popup.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('DashboardGameCardComponent', () => {
  let component: DashboardGameCardComponent;
  let fixture: ComponentFixture<DashboardGameCardComponent>;
  const testData =   {
    img: 'assets/images/dashboard-game-card/rewards-icon.png',
    title: 'Rewards',
    description: 'Create reward items to giveaway for your campaigns or display in your catalogue',
    link: 'Create a Reward',
    name: 'reward'
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ButtonModule,
        CreateEngagementPopupModule,
        RouterTestingModule
      ],
      declarations: [ DashboardGameCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardGameCardComponent);
    component = fixture.componentInstance;
    component.gameCard = testData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
