import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct, ProductService } from '../services/product.service';
import {
  IMerchantAdminService,
  IMerchantAdminTransaction,
  IMerchantProfile,
  NotificationService,
  TokenStorage,
  IProfile
} from '@perxtech/core';
import { forkJoin, from, Observable, throwError } from 'rxjs';
import { mergeMap, switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

export interface IPayload {
  name: string;
  id: number;
  rewardId?: number;
  identifier?: string;
  verifiedUser?: IProfile;
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
  public userId: number;

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
        if (this.payload.verifiedUser) {
          this.userId = this.payload.verifiedUser.id ? this.payload.verifiedUser.id : 0;
        } else {
          this.userId = this.payload.id;
        }
      } catch (error) {
        this.notificationService.addSnack('Invalid Merck QR Code');
      }
    }
    this.productService.getProducts().subscribe(res => this.rewards = res);
    this.language = this.translateService.currentLang || this.translateService.defaultLang;
  }

  public newQuantity(newData: Product): void {
    this.rewards[newData.index].quantity = newData.qty;
    this.checkUpdatedRewards();
  }

  private checkUpdatedRewards(): void {
    this.selectedProducts = this.rewards.filter(reward => reward.quantity && reward.quantity > 0);
    this.totalPoints = this.selectedProducts.reduce((sum, current) =>
      sum + (current.quantity ? current.quantity : 0) * current.pointsPerUnit, 0);
  }

  public toggleSummary(): void {
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
    // @ts-ignore
    const dateStamp = (`0${date.getDate()}`).slice(-2) + (`0${date.getMonth() + 1}`).slice(-2) + date.getFullYear().toString();

    this.merchantAdminService.getMerchantProfile()
      .pipe(
        switchMap((merchantProfile: IMerchantProfile) => {
          const merchantName: string | undefined = merchantProfile.merchantAccount && merchantProfile.merchantAccount.name;
          if (!merchantName) {
            return throwError({ message: 'merchant name is required' });
          }
          if (!this.userId) {
            return throwError({ message: 'user id is required' });
          }
          return from(this.selectedProducts).pipe(
            mergeMap((product: IProduct) => {
              const partDataRequests: Observable<IMerchantAdminTransaction>[] = [];
              if (product.quantity) {
                for (let i = 0; i < product.quantity; i++) {
                  partDataRequests.push(this.merchantAdminService.createTransaction(
                    this.userId , merchantUsername, product.price, product.currency,
                    'purchase', `${dateStamp}-${this.payload.id}`, merchantName,
                    `${product.name} ${product.description}`));
                }
              }
              return forkJoin(partDataRequests);
            })
          );
        })
      )
      // .subscribe((transactions: IMerchantAdminTransaction[]) => {
      .subscribe(() => {
        // const ids = transactions.map(transaction => transaction.id);
        // const idsToString = ids.join(', ');
        const message = this.language === 'zh' ? '交易完成' : 'Transaction completed';
        this.notificationService.addSnack(message);
        this.router.navigate(['/home']);
      });
  }

  public getPoints(): string {
    return this.language === 'zh' ? `將獲得${this.totalPoints}積分` : `${this.totalPoints} points will be issued`;
  }
}
