import { Component, ContentChild, Directive, Input, TemplateRef } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Directive({selector: '[csDownloadLinkButton]'})
export class DownloadLinkButtonDirective {
  constructor(public template: TemplateRef<any>) {}
}

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

  @ContentChild(DownloadLinkButtonDirective, {static: false}) public button: DownloadLinkButtonDirective;

  public constructor(private sanitizer: DomSanitizer) { }
}
