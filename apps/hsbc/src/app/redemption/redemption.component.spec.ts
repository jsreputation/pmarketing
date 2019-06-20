import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedemptionComponent } from './redemption.component';
import { VouchersModule } from '@perx/core/dist/perx-core';
import { environment } from '../../environments/environment';

describe('RedemptionComponent', () => {
  let component: RedemptionComponent;
  let fixture: ComponentFixture<RedemptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RedemptionComponent],
      imports: [
        VouchersModule.forRoot({ env: environment })
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedemptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
