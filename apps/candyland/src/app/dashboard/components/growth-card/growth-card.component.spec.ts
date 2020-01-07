import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowthCardComponent } from './growth-card.component';

describe('GrowthCardComponent', () => {
  let component: GrowthCardComponent;
  let fixture: ComponentFixture<GrowthCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrowthCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowthCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
