import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMerchantViewComponent } from './list-merchant-view.component';

describe('ListMerchantViewComponent', () => {
  let component: ListMerchantViewComponent;
  let fixture: ComponentFixture<ListMerchantViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMerchantViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMerchantViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
