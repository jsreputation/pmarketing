import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsComponent } from './rewards.component';
import { UnderConstructionModule } from '../../../../shared/under-construction/under-construction.module';

describe('RewardsComponent', () => {
  let component: RewardsComponent;
  let fixture: ComponentFixture<RewardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RewardsComponent],
      imports: [UnderConstructionModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
