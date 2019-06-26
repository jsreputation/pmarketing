import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInstantRewardAppearancePageComponent } from './new-instant-reward-appearance-page.component';

describe('NewInstantRewardAppearancePageComponent', () => {
  let component: NewInstantRewardAppearancePageComponent;
  let fixture: ComponentFixture<NewInstantRewardAppearancePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewInstantRewardAppearancePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewInstantRewardAppearancePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
