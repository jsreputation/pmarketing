import { Injectable } from '@angular/core';
import { DataService } from '@perxtech/chart';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class CsvReportService {
  constructor(private messageService: MessageService, private dataService: DataService) { }

  public downloadReport(reportId: string, options?: { [k: string]: string }): void {
    this.messageService.show('Generating report', 'success', 0);
    this.dataService.getReport(reportId, options)
      .subscribe(
        (res: string) => {
          this.messageService.show('Report generated', 'success');
          const b = new Blob([res], { type: 'application/csv;charset=utf-8;' });
          const fileUrl = URL.createObjectURL(b);
          const element = document.createElement('a');
          element.setAttribute('href', fileUrl);
          element.setAttribute('download', `${reportId}-.csv`);
          element.style.display = 'none';
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
        },
        () => {
          this.messageService.show('Could not download report', 'danger');
        }
      );
  }
}
