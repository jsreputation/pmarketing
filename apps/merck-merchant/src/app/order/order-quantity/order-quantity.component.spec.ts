import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderQuantityComponent } from './order-quantity.component';
import { FormsModule } from '@angular/forms';

describe('OrderQuantityComponent', () => {
  let component: OrderQuantityComponent;
  let fixture: ComponentFixture<OrderQuantityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderQuantityComponent ],
      imports: [ FormsModule ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit newQuantity onDecreaseQty call with greater than 0 quantity', () => {
    component.quantity = 2;
    spyOn(component.newQuantity, 'emit');
    component.onDecreaseQty();
    expect(component.newQuantity.emit).toHaveBeenCalledWith({qty: 1, index: undefined});
  });

  it('should NOT emit newQuantity onDecreaseQty call with less than or equal to 0 quantity', () => {
    component.quantity = 0;
    spyOn(component.newQuantity, 'emit');
    component.onDecreaseQty();
    expect(component.newQuantity.emit).not.toHaveBeenCalled();
  });

  it('should emit newQuantity onIncreaseQty call with greater than 0 quantity', () => {
    component.quantity = 1;
    spyOn(component.newQuantity, 'emit');
    component.onIncreaseQty();
    expect(component.newQuantity.emit).toHaveBeenCalledWith({qty: 2, index: undefined});
  });

  it('should emit newQuantity onQuantityChange call', () => {
    spyOn(component.newQuantity, 'emit');
    component.onQuantityChange('1');
    expect(component.newQuantity.emit).toHaveBeenCalledWith({qty: 1, index: undefined});
  });

});
