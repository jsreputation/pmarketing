import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandyshopFormsComponent } from './candyshop-forms.component';

describe('CandyshopFormsComponent', () => {
  let component: CandyshopFormsComponent;
  let fixture: ComponentFixture<CandyshopFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandyshopFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandyshopFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
