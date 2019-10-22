import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'cl-download-link',
  templateUrl: './download-link.component.html',
  styleUrls: ['./download-link.component.scss']
})
export class DownloadLinkComponent {
  @Input() public file: string;
  @Input() public link: string;

  public constructor(private sanitizer: DomSanitizer) { }
  public sanitizeLink(link: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(link);
  }
}
