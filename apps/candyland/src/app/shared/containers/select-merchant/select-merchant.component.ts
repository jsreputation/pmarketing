import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MerchantService } from '@cl-core/services/merchant.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatTableDataSource } from '@angular/material';
import { PrepareTableFilers } from '@cl-helpers/prepare-table-filers';

@Component({
  selector: 'cl-select-merchant',
  templateUrl: './select-merchant.component.html',
  styleUrls: ['./select-merchant.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectMerchantComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;
  public dataSource = new MatTableDataSource<any>();
  public selectMerchant: IMerchant;
  constructor(public dialogRef: MatDialogRef<SelectMerchantComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private merchantService: MerchantService) { }

  ngOnInit() {
    this.getMerchants();
  }

  ngAfterViewInit() {
    this.dataSource.filterPredicate = PrepareTableFilers.getClientSideFilterFunction();
    this.dataSource.paginator = this.paginator;
  }

  public selectedMerchant(merchant: IMerchant): void {
    this.selectMerchant = merchant;
  }

  public close(): void {
    this.dialogRef.close(this.selectMerchant);
  }

  private getMerchants(): void {
    this.merchantService.getMerchant()
       .subscribe((val: IMerchant[]) => {
         this.dataSource.data = val;
       });
  }
}
