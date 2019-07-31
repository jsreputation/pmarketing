import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsCarouselComponent } from './rewards-carousel.component';

describe('RewardsCarouselComponent', () => {
  let component: RewardsCarouselComponent;
  let fixture: ComponentFixture<RewardsCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardsCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardsCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
