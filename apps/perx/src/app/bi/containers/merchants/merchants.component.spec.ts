import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantsComponent } from './merchants.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('MerchantsComponent', () => {
  let component: MerchantsComponent;
  let fixture: ComponentFixture<MerchantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MerchantsComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
