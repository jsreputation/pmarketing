import { Component, ChangeDetectionStrategy, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AudiencesService, IPoolUserLink } from '@cl-core-services';

export interface ManageListPopupComponentOutput {
  id: string;
  pools: { id: string, type: string }[];
}

@Component({
  selector: 'cl-manage-list-popup',
  templateUrl: './manage-list-popup.component.html',
  styleUrls: ['./manage-list-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageListPopupComponent implements OnInit {
  public pools: IPoolUserLink[] = [];
  public poolsArray: { id: string, type: string }[] = [];

  constructor(
    public dialogRef: MatDialogRef<ManageListPopupComponent>,
    public audiencesService: AudiencesService,
    private ref: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: IAudiencesUserForm
  ) {
  }

  public ngOnInit(): void {
    this.getPools();
  }

  public setSelectedPools(): void {
    const userPools = this.data.audienceList;
    userPools.forEach(item => {
      this.pools.forEach((pool: any) => {
        if (item && pool.name === item) {
          pool.checked = true;
          this.changePools(pool.value, true);
        }
      });
    });
  }

  private getPools(): void {
    this.audiencesService.getAudiencesList()
      .subscribe((data: IPoolUserLink[]) => {
        this.pools = data;
        this.setSelectedPools();
        this.ref.markForCheck();
      });
  }

  public changePools(value: any, checked: boolean): void {
    if (checked) {
      this.poolsArray.push(value);
    } else {
      this.poolsArray.splice(this.poolsArray.indexOf(value), 1);
    }
  }

  public close(): void {
    this.dialogRef.close(null);
  }

  public save(): void {
    const requestData: ManageListPopupComponentOutput = {
      id: this.data.id,
      // type: this.data.type,
      pools: this.poolsArray
    };
    this.dialogRef.close(requestData);
  }
}
