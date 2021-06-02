import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { LoyaltyService } from '@perxtech/core';
import { of } from 'rxjs';
import { PointHistoryComponent } from './point-history.component';

describe('PointHistoryComponent', () => {
  let component: PointHistoryComponent;
  let fixture: ComponentFixture<PointHistoryComponent>;
  const loyaltyServiceStub: Partial<LoyaltyService> = {
    getTransactionHistory: () => of([])
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PointHistoryComponent],
      imports: [
        MatCardModule
      ],
      providers: [
        { provide: LoyaltyService, useValue: loyaltyServiceStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
