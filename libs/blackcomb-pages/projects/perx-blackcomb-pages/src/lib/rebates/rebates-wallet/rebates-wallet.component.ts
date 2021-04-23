import { switchMap, share, map } from 'rxjs/operators';
import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  Observable,
  Subject,
  combineLatest,
  of
} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import {
  IProfile,
  LoyaltyService,
  ProfileService,
  QrScannerComponent,
  ILoyalty,
  PointsToCashPipe,
  ILoyaltyTransaction
} from '@perxtech/core';
import {
  NavigationExtras,
  Router
} from '@angular/router';
// import { MerchantData } from '../rebates.types';

// const unformatMoney = (moneyString: string): number => {
//   if (!moneyString) {
//     return 0.00;
//   }
//
//   return parseFloat(moneyString.replace('$', ''));
// };
//
// const merchantsData: MerchantData[] = [
//   {
//     logo: 'https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-original-577x577/s3/0007/1621/brand.gif?itok=i1z5e_GW',
//     merchantId: 0,
//     name: 'O’Brien’s Irish Sandwich Bar',
//     description: 'Any participating branch',
//     imgUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/06/da/b8/f2/exterior-of-restaurant.jpg',
//     rebateAmount: '$5.00',
//     price: '$10.00'
//   },
//   {
//     logo: 'https://cdn.freebiesupply.com/images/large/2x/starbucks-logo-png-transparent.png',
//     merchantId: 1,
//     name: 'Starbucks Coffee',
//     description: 'Any participating branch',
//     imgUrl: 'https://api.time.com/wp-content/uploads/2016/06/starbucks1.jpg?w=800&quality=85',
//     rebateAmount: '$5.00'
//   }
// ];
@Component({
  selector: 'perx-blackcomb-rebates-wallet',
  templateUrl: './rebates-wallet.component.html',
  styleUrls: ['./rebates-wallet.component.scss']
})
export class RebatesWalletComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  // private qrScannerDialogRef: MatDialogRef<any>;
  public subTitleFn: (merchant: ILoyalty[]) => string;
  public titleFn: (profile: IProfile) => string;

  public sumRebates: (merchant: ILoyalty[]) => string;
  public profile$: Observable<IProfile>;
  public merchants$: Observable<ILoyalty[]>; // mocking merchant data

  constructor(
    private dialog: MatDialog,
    private profileService: ProfileService,
    private router: Router,
    private loyaltyService: LoyaltyService,
    private toDp: PointsToCashPipe
  ) { }

  public ngOnInit(): void {
    // if (!localStorage.getItem('merchantsRebates')) {
    //   localStorage.setItem('merchantsRebates', JSON.stringify(merchantsData));
    // }
    // const merchantCards = JSON.parse(localStorage.getItem('merchantsRebates') as string) as any[];
    // this.merchants$ = of(merchantCards);

    // there's no get all loyalties yet. make a query with a larger page size to get more.
    this.merchants$ = this.loyaltyService.getLoyalties().pipe(
      switchMap((loyalties: ILoyalty[]) => combineLatest(
        [...loyalties.map(loyalty => this.loyaltyService.getTransactions(loyalty.id).pipe(
          switchMap((transactions: ILoyaltyTransaction[]) => {
            if (transactions.length > 0) {
              return of(loyalty);
            }
            return of(null);
          })
        ))])
      ),
      map((res: ILoyalty[]) => res.filter(loyal => loyal !== null)),
      share()
    );

    this.subTitleFn = (data: ILoyalty[]) => `Your total rebate funds across ${data.length} merchants`;
    this.titleFn = (profile) => {
      let returnString = 'Welcome';
      if (profile && profile.firstName && profile.firstName !== '') {
        returnString = `${returnString}, ${profile.firstName}`;
      } else if (profile && profile.lastName && profile.lastName !== '') {
        returnString = `${returnString}, ${profile.lastName}`;
      }
      return returnString;
    };
    this.profile$ = this.profileService.whoAmI();
    this.sumRebates = (merchants: ILoyalty[]) => `$${this.toDp.transform(merchants.reduce((acc: number, curr: ILoyalty) => curr.pointsBalance + acc, 0), 2)}`;
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public merchantSelected(merchantRebate: any): void {
    // does nothing for now, to be determined what this does, currently go to reward-detail by scanning
    // if able to just click defeats the purpose of scan
    console.log('merchant was selected ', merchantRebate);
  }

  public goQrPage(): void {
    this.dialog.open(QrScannerComponent, {
      height: '80%',
      width: '90%'
    }).afterClosed()
      .subscribe(response => {
        if (response) {
          const merchantRebateData = response.data;
          const navigationExtras: NavigationExtras = {
            state: {
              merchantRebateData
            }
          };
          this.router.navigate(['rebates/overview'], navigationExtras);
        }
        return;
      });
  }

}
