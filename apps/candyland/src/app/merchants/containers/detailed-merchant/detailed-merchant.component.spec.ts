import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedMerchantComponent } from './detailed-merchant.component';

describe('DetailedMerchantComponent', () => {
  let component: DetailedMerchantComponent;
  let fixture: ComponentFixture<DetailedMerchantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedMerchantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
