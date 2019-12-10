import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService, IProduct } from '../services/product.service';
import { IMerchantAdminService, IMerchantAdminTransaction, IMerchantProfile, NotificationService, TokenStorage } from '@perx/core';
import { from, throwError } from 'rxjs';
import { mergeMap, switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

export interface IPayload {
  name: string;
  id: number;
  rewardId?: number;
  identifier?: string;
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
  public selectedProducts: IProduct[] = [];
  public totalPoints: number;
  public language: string;

  constructor(
    private router: Router,
    private productService: ProductService,
    private notificationService: NotificationService,
    private merchantAdminService: IMerchantAdminService,
    private tokenStorage: TokenStorage,
    private translateService: TranslateService,
  ) {
  }

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
    this.language = this.translateService.currentLang || this.translateService.defaultLang;
  }

  public newQuantity(newData: Product): void {
    this.rewards[newData.index].quantity = newData.qty;
  }

  private checkUpdatedRewards(): void {
    this.selectedProducts = this.rewards.filter(reward => reward.quantity && reward.quantity > 0);
    this.totalPoints = this.selectedProducts.reduce((sum, current) =>
      sum + (current.quantity ? current.quantity : 0) * current.pointsPerUnit, 0);
  }

  public toggleSummary(): void {
    this.checkUpdatedRewards();
    this.isSummaryActivated = !this.isSummaryActivated;
  }

  public onCancel(): void {
    this.router.navigate(['/home']);
  }

  public onCompleteTransaction(): void {
    const merchantUsername = this.tokenStorage.getAppInfoProperty('merchantUsername');
    if (!merchantUsername) {
      this.notificationService.addSnack('merchant username is void');
      return;
    }
    // 0 padded date
    const date = new Date();
    const dateStamp = ('0' + date.getDate()).slice(-2) + ('0' + (date.getMonth() + 1)).slice(-2) + date.getFullYear().toString();

    this.merchantAdminService.getMerchantProfile()
      .pipe(
        switchMap((merchantProfile: IMerchantProfile) => {
          const merchantName: string | undefined = merchantProfile.merchantAccount && merchantProfile.merchantAccount.name;
          if (!merchantName) {
            return throwError({ message: 'merchant name is required' });
          }
          return from(this.selectedProducts).pipe(
            mergeMap((product: IProduct) => {

              return this.merchantAdminService.createTransaction(
                this.payload.id, merchantUsername, product.price, product.currency,
                'purchase', dateStamp + '-' + this.payload.id, merchantName, product.name);
            })
          );
        })
      )
      .subscribe((transaction: IMerchantAdminTransaction) => {
        const message = this.language === 'zh' ? `交易 ID ${transaction.id} 完成` : `Transaction ID: ${transaction.id} completed`;
        this.notificationService.addSnack(message);
        this.router.navigate(['/home']);
      });
  }

  public getPoints(): string {
    return this.language === 'zh' ? `將獲得${this.totalPoints}積分` : `${this.totalPoints} points will be issued`;
  }
}
