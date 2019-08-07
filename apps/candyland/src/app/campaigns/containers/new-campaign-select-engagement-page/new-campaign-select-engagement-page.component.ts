import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { PrepareTableFilers } from '@cl-helpers/prepare-table-filers';
import { MatTableDataSource } from '@angular/material';
import { EngagementsService } from '@cl-core/services/engagements.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CampaignCreationStoreService } from '@cl-core/services/campaigns-creation-store.service';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'cl-new-campaign-select-engagement-page',
  templateUrl: './new-campaign-select-engagement-page.component.html',
  styleUrls: ['./new-campaign-select-engagement-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCampaignSelectEngagementPageComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public dataSource = new MatTableDataSource<Engagement>();
  public typeFilterConfig: OptionConfig[];

  public get template(): AbstractControl {
    return this.form.get('template');
  }

  constructor(private engagementsService: EngagementsService,
              private store: CampaignCreationStoreService,
              private fb: FormBuilder,
              public cd: ChangeDetectorRef) {
    this.initForm();
  }

  public ngOnInit(): void {
    this.initData();
    this.dataSource.filterPredicate = PrepareTableFilers.getClientSideFilterFunction();
    this.form.valueChanges.pipe(untilDestroyed(this)).subscribe(value => this.store.updateCampaign(value));
  }

  public ngOnDestroy(): void {
  }

  private initForm(): void {
    this.form = this.fb.group({
      template: [null, [Validators.required]]
    });
    this.form.patchValue(this.store.currentCampaign);
  }

  private initData(): void {
    this.engagementsService.getEngagements()
      .pipe(
        map((response: any) => response.results),
        tap(data => {
          const counterObject = PrepareTableFilers.countFieldValue(data, 'type');
          this.typeFilterConfig = PrepareTableFilers.prepareOptionsConfig(counterObject);
        }),
      )
      .subscribe((res: Engagement[]) => {
        this.dataSource.data = res;
        this.cd.detectChanges();
      });
  }

}
