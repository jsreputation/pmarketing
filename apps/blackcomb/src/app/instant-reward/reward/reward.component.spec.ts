import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RewardComponent } from './reward.component';
import { RouterTestingModule } from '@angular/router/testing';
import { GameModule, RewardsModule, ProfileModule } from '@perx/core';

describe('RewardComponent', () => {
  let component: RewardComponent;
  let fixture: ComponentFixture<RewardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RewardComponent],
      imports: [
        RouterTestingModule,
        GameModule,
        RewardsModule,
        ProfileModule,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
