import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatEnrollCompletePageComponent } from './treat-enroll-complete-page.component';
import { SharedModule } from '../../shared/shared.module';
import { TaggedItemComponent } from '../../shared/components/tagged-item/tagged-item.component';
import { RouterTestingModule } from "@angular/router/testing";
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

describe('TreatEnrollCompletePageComponent', () => {
  let component: TreatEnrollCompletePageComponent;
  let fixture: ComponentFixture<TreatEnrollCompletePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreatEnrollCompletePageComponent,TaggedItemComponent],
      imports: [
        SharedModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        { provide: TranslateService, useValue: { get: () => of() } }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    window.history.pushState({ promoId: '123'}, '', '');
    fixture = TestBed.createComponent(TreatEnrollCompletePageComponent);
    component = fixture.componentInstance;
    component.promoId="123"
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
