import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingCardComponent } from './existing-card.component';

describe('ExistingCardComponent', () => {
  let component: ExistingCardComponent;
  let fixture: ComponentFixture<ExistingCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistingCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
