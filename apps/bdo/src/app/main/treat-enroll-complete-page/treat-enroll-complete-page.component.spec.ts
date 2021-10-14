import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaggedItemComponent } from '../../shared/components/tagged-item/tagged-item.component';

import { TreatEnrollCompletePageComponent } from './treat-enroll-complete-page.component';

describe('TreatEnrollCompletePageComponent', () => {
  let component: TreatEnrollCompletePageComponent;
  let fixture: ComponentFixture<TreatEnrollCompletePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreatEnrollCompletePageComponent,TaggedItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatEnrollCompletePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
