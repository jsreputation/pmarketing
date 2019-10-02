import { Component, ChangeDetectionStrategy, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AudiencesService } from '@cl-core-services';

@Component({
  selector: 'cl-manage-list-popup',
  templateUrl: './manage-list-popup.component.html',
  styleUrls: ['./manage-list-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ManageListPopupComponent implements OnInit {
  public pools = [];
  public poolsArray = [];

  constructor(public dialogRef: MatDialogRef<ManageListPopupComponent>,
              public audiencesService: AudiencesService,
              private ref: ChangeDetectorRef,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  public ngOnInit(): void {
    this.getPools();
  }

  public setSelectedPools(): any {
    const userPools = this.data.pools.split(', ');
    userPools.forEach(item => {
      this.pools.forEach(pool => {
        if (item && pool.name === item) {
          pool.checked = true;
          this.changePools(pool.value, true);
        }
      });
    });
  }

  private getPools(): any {
    this.audiencesService.getAudiencesList()
      .subscribe((data: any) => {
        this.pools = data;
        this.setSelectedPools();
        this.ref.markForCheck();
      });
  }

  public changePools(value, checked): any {
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
    const requestData = {
      id: this.data.id,
      type: this.data.type,
      pools: this.poolsArray
    };
    this.dialogRef.close(requestData);
  }
}
