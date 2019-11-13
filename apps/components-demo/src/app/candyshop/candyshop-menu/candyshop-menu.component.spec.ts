import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandyshopMenuComponent } from './candyshop-menu.component';

describe('CandyshopMenuComponent', () => {
  let component: CandyshopMenuComponent;
  let fixture: ComponentFixture<CandyshopMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandyshopMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandyshopMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
