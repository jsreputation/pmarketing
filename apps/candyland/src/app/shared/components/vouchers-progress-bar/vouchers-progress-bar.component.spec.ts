import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VouchersProgressBarComponent } from './vouchers-progress-bar.component';
// tslint:disable
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

describe('VouchersProgressBarComponent', () => {
  let component: VouchersProgressBarComponent;
  let fixture: ComponentFixture<VouchersProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VouchersProgressBarComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        TranslateModule.forRoot()
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VouchersProgressBarComponent);
    component = fixture.componentInstance;
    component.options = [{ type: 'test', value: 5 }];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
