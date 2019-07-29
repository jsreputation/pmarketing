import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MerchantService } from '@cl-core/services/merchant.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { PrepareTableFilers } from '@cl-helpers/prepare-table-filers';

@Component({
  selector: 'cl-list-merchant',
  templateUrl: './list-merchant.component.html',
  styleUrls: ['./list-merchant.component.scss']
})
export class ListMerchantComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;
  public dataSource = new MatTableDataSource<any>();
  constructor(private merchantService: MerchantService) { }

  ngOnInit() {
    this.getListMerchant();
    this.dataSource.filterPredicate = PrepareTableFilers.getClientSideFilterFunction();
  }


  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  public openDialogCreate(): void {
    // open modal
  }

  private getListMerchant(): void {
    this.merchantService.getMerchantList()
      .subscribe((res) => {
        console.log(res);
        this.dataSource.data = res;
      });
  }

}
