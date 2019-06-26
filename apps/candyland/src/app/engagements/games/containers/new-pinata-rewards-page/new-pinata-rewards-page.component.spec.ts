import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPinataRewardsPageComponent } from './new-pinata-rewards-page.component';

describe('NewPinataRewardsPageComponent', () => {
  let component: NewPinataRewardsPageComponent;
  let fixture: ComponentFixture<NewPinataRewardsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPinataRewardsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPinataRewardsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
