import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsCardsComponent } from './rewards-cards.component';

describe('RewardsCardsComponent', () => {
  let component: RewardsCardsComponent;
  let fixture: ComponentFixture<RewardsCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardsCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardsCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
