import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesContactComponent } from './sales-contact.component';
import { TranslateModule } from '@ngx-translate/core';

describe('SalesContactComponent', () => {
  let component: SalesContactComponent;
  let fixture: ComponentFixture<SalesContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TranslateModule.forRoot() ],
      declarations: [ SalesContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
