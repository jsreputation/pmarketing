import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VouchersComponent } from './vouchers.component';
import { MatCardModule } from '@angular/material/card';

describe('VouchersComponent', () => {
  let component: VouchersComponent;
  let fixture: ComponentFixture<VouchersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VouchersComponent],
      imports: [MatCardModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VouchersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
