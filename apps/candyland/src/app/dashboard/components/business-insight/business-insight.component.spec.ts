import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessInsightComponent } from './business-insight.component';
import { TranslateModule } from '@ngx-translate/core';

describe('BusinessInsightComponent', () => {
  let component: BusinessInsightComponent;
  let fixture: ComponentFixture<BusinessInsightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessInsightComponent ],
      imports: [
        TranslateModule.forRoot(),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessInsightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
