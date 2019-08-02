import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

interface Product {
  qty: number;
  index: number;
}

@Component({
  selector: 'app-order-quantity',
  templateUrl: './order-quantity.component.html',
  styleUrls: ['./order-quantity.component.scss']
})
export class OrderQuantityComponent implements OnInit {
  @Input() public quantity: number;
  @Input() private index: number;

  @Output() public newQuantity: EventEmitter<Product> = new EventEmitter();

  public ngOnInit(): void {
    this.quantity = this.quantity ? this.quantity : 0;
  }

  public onDecreaseQty(): void {
    if ( this.quantity <= 0) {
      return;
    }
    this.quantity--;
    this.newQuantity.emit({
      qty: this.quantity,
      index: this.index
    });
  }

  public onIncreaseQty(): void {
    this.quantity++;
    this.newQuantity.emit({
      qty: this.quantity,
      index: this.index
    });
  }

  public onQuantityChange(qty: string): void {
    if (!qty) {
      qty = '0';
    }
    this.quantity = parseInt(qty, 10);
    this.newQuantity.emit({
      qty: this.quantity,
      index: this.index
    });
  }

}
