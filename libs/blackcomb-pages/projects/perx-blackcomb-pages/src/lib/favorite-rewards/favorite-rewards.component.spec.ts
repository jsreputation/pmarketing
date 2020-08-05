import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteRewardsComponent } from './favorite-rewards.component';

describe('FavoriteRewardsComponent', () => {
  let component: FavoriteRewardsComponent;
  let fixture: ComponentFixture<FavoriteRewardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteRewardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteRewardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
