import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerxCoreComponent } from './perx-core.component';

describe('PerxCoreComponent', () => {
  let component: PerxCoreComponent;
  let fixture: ComponentFixture<PerxCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerxCoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerxCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
