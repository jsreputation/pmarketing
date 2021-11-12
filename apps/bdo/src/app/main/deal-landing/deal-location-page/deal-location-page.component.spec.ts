import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { IVoucherService } from '@perxtech/core';
import { of } from 'rxjs';
import { DealLocationPageComponent } from './deal-location-page.component';

class v4VouchersService {
  getRewardLocations(id) {
    return of(id);
  }
}

describe('DealLocationPageComponent', () => {
  let component: DealLocationPageComponent;
  let fixture: ComponentFixture<DealLocationPageComponent>;
  const routerBdo: Partial<Router> = {
    navigate: () => Promise.resolve(true)
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DealLocationPageComponent],
      imports: [],
      providers: [
        { provide: IVoucherService, useClass: v4VouchersService },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of([{ rid: 123 }]),
          },
        },
        { provide: Router, useValue: routerBdo },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealLocationPageComponent);
    component = fixture.componentInstance;
    component.lstVoucherLocation = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
