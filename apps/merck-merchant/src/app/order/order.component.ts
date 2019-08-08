import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService, IProduct } from '../services/product.service';
import { NotificationService } from '@perx/core';

export interface IPayload {
  name: string;
  id: number;
  rewardId?: number;
}

interface Product {
  qty: number;
  index: number;
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  public payload: IPayload;
  public rewards: IProduct[];
  public isSummaryActivated: boolean = false;
  public selectedProducts: IProduct[];
  public totalPoints: number;

  constructor(
    private router: Router,
    private productService: ProductService,
    private notificationService: NotificationService
  ) {}

  public ngOnInit(): void {
    const scannedQrCode = history.state.data;
    if (scannedQrCode) {
      try {
        this.payload = JSON.parse(scannedQrCode);
      } catch (error) {
        this.notificationService.addSnack('Invalid Merck QR Code');
      }
    }
    this.productService.getProducts().subscribe(res => this.rewards = res);
  }

  public newQuantity(newData: Product): void {
    this.rewards[newData.index].quantity = newData.qty;
  }

  private checkUpdatedRewards(): void {
    this.selectedProducts = this.rewards.filter(reward => reward.quantity > 0);
    this.totalPoints = this.selectedProducts.reduce((sum, current) =>  sum + current.quantity  * current.pointsPerUnit, 0);
  }

  public toggleSummary(): void {
    this.checkUpdatedRewards();
    this.isSummaryActivated = !this.isSummaryActivated;
  }

  public onCancel(): void {
    this.router.navigate(['/home']);
  }

  public onCompleteTransaction(): void {
    // Call api TBD https://perxtechnologies.atlassian.net/browse/PW-483
    this.notificationService.addSnack('Transaction completed'),
    this.router.navigate(['/home']);
  }
}
