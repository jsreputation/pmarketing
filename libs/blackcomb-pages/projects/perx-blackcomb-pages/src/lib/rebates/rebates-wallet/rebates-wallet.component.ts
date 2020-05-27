import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  Observable, of, Subject
} from 'rxjs';
import {MatDialog} from '@angular/material';
import { QrScannerComponent } from '@perxtech/core';
import { NavigationExtras, Router} from '@angular/router';

const merchantsData = [
  {
    merchantId: 0,
    name: 'Sony',
    imgUrl: 'http://videogamerepairs.ca/wp-content/uploads/2015/06/PlayStation-1.jpg',
    rebateAmount: 300
  },
  {
    merchantId: 1,
    name: 'Nintendo',
    imgUrl: 'http://videogamerepairs.ca/wp-content/uploads/2015/06/Gameboy-DMG.jpg',
    rebateAmount: 200
  }
];
@Component({
  selector: 'perx-blackcomb-rebates-wallet',
  templateUrl: './rebates-wallet.component.html',
  styleUrls: ['./rebates-wallet.component.scss']
})
export class RebatesWalletComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  // private qrScannerDialogRef: MatDialogRef<any>;

  public merchants$: Observable<any[]>; // mocking merchant data

  constructor(
    private dialog: MatDialog,
    private router: Router
  ) { }

  public ngOnInit(): void {
    if (!localStorage.getItem('merchantsRebates')) {
      localStorage.setItem('merchantsRebates', JSON.stringify(merchantsData));
    }
    const merchantCards = JSON.parse(localStorage.getItem('merchantsRebates') as string) as any[];
    this.merchants$ = of(merchantCards);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public merchantSelected(merchantRebate: any): void {
    console.log('merchant was selected ', merchantRebate);
  }

  public openScannerDialog(): void {
    this.dialog.open(QrScannerComponent).afterClosed()
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
