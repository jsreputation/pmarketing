import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'cs-download-link',
  templateUrl: './download-link.component.html',
  styleUrls: ['./download-link.component.scss']
})
export class DownloadLinkComponent {
  public safeLink: SafeUrl;
  @Input() public fileName: string;
  @Input() public set link(url: string) {
    this.safeLink = this.sanitizer.bypassSecurityTrustUrl(url);
  }

  public constructor(private sanitizer: DomSanitizer) { }
}
