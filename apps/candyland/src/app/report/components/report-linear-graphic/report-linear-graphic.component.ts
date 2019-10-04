import { Component, Input, OnChanges } from '@angular/core';
import { ApiConfig } from '@cl-core/api-config';

@Component({
  selector: 'cl-report-linear-graphic',
  templateUrl: './report-linear-graphic.component.html',
  styleUrls: ['./report-linear-graphic.component.scss']
})
export class ReportLinearGraphicComponent implements OnChanges {
  @Input() public data: StampsGraphicData;
  public apiCdnPath = ApiConfig.apiCdnPath;
  public existPrefixText: boolean;

  public ngOnChanges(): void {
    this.checkExistingText();
  }

  private checkExistingText(): void {
    if (this.data && this.data.data) {
      this.existPrefixText = this.data.data.some((item) => !!item.choices.text);
    }
  }

}
