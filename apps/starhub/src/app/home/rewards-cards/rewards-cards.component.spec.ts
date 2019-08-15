import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsCardsComponent } from './rewards-cards.component';
import { MatIconModule, MatCardModule } from '@angular/material';

describe('RewardsCardsComponent', () => {
  let component: RewardsCardsComponent;
  let fixture: ComponentFixture<RewardsCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardsCardsComponent ],
      imports: [
        MatIconModule,
        MatCardModule
      ]
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
