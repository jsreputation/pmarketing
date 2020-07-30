import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NearmeComponent } from './nearme.component';

describe('NearmeComponent', () => {
  let component: NearmeComponent;
  let fixture: ComponentFixture<NearmeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearmeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NearmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
