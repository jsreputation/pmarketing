import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnlargedQrComponent } from './enlarged-qr.component';

describe('EnlargedQrComponent', () => {
  let component: EnlargedQrComponent;
  let fixture: ComponentFixture<EnlargedQrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnlargedQrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnlargedQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
