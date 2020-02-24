import { Component, Input, OnChanges } from '@angular/core';
import { ApiConfig } from '@cl-core/api-config';
import { StampsGraphicData } from '@cl-core/models/reports/stamps-report/stamps-report.interface';

@Component({
  selector: 'cl-report-linear-graphic',
  templateUrl: './report-linear-graphic.component.html',
  styleUrls: ['./report-linear-graphic.component.scss']
})
export class ReportLinearGraphicComponent implements OnChanges {
  @Input() public data: StampsGraphicData;
  public apiCdnPath: string = ApiConfig.apiCdnPath;
  public existPrefixText: boolean;

  public ngOnChanges(): void {
    this.checkExistingText();
  }

  private checkExistingText(): void {
    if (this.data && this.data.payload) {
      this.existPrefixText = this.data.payload.some((item) => !!item.choices.text);
    }
  }

}
