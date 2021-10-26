import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatEnrollCompletePageComponent } from './treat-enroll-complete-page.component';
import { SharedModule } from '../../shared/shared.module';
import { TaggedItemComponent } from '../../shared/components/tagged-item/tagged-item.component';
import { FooterReferComponent } from '../../shared/components/footer-refer/footer-refer.component';

describe('TreatEnrollCompletePageComponent', () => {
  let component: TreatEnrollCompletePageComponent;
  let fixture: ComponentFixture<TreatEnrollCompletePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreatEnrollCompletePageComponent,TaggedItemComponent,FooterReferComponent],
      imports: [
        SharedModule
      ]
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
