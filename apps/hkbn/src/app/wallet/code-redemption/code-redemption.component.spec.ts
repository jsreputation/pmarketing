import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeRedemptionComponent } from './code-redemption.component';
import { MatButtonModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { VouchersModule } from '@perx/core';
import { TranslateModule } from '@ngx-translate/core';

describe('CodeRedemptionComponent', () => {
  let component: CodeRedemptionComponent;
  let fixture: ComponentFixture<CodeRedemptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        RouterTestingModule,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        VouchersModule.forRoot({env: {apiHost: ''}})
      ],
      declarations: [CodeRedemptionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeRedemptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
