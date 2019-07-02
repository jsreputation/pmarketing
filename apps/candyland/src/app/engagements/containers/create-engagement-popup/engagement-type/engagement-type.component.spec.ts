import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementTypeComponent } from './engagement-type.component';

describe('EngagementTypeComponent', () => {
  let component: EngagementTypeComponent;
  let fixture: ComponentFixture<EngagementTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EngagementTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngagementTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
