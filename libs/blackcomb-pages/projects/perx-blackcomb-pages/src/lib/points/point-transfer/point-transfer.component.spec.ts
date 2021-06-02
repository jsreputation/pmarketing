import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointTransferComponent } from './point-transfer.component';

describe('PointTransferComponent', () => {
  let component: PointTransferComponent;
  let fixture: ComponentFixture<PointTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
