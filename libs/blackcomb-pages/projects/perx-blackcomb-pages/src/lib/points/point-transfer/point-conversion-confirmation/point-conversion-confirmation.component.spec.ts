import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';

import { PointConversionConfirmationComponent } from './point-conversion-confirmation.component';

describe('PointConversionConfirmationComponent', () => {
  let component: PointConversionConfirmationComponent;
  let fixture: ComponentFixture<PointConversionConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PointConversionConfirmationComponent],
      imports: [
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        MatCardModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointConversionConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
