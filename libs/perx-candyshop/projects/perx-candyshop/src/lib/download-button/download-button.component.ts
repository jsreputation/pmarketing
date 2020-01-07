import { Component, ContentChild, Directive, Input, TemplateRef } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Directive({selector: '[csDownloadIcon]'})
export class DownloadIconDirective {
  constructor(public template: TemplateRef<any>) {}
}

@Component({
  selector: 'cs-download-button',
  templateUrl: './download-button.component.html',
  styleUrls: ['./download-button.component.scss']
})
export class DownloadButtonComponent {
  public safeLink: SafeUrl;
  @Input() public set link(url: string) {
    this.safeLink = this.sanitizer.bypassSecurityTrustUrl(url);
  }
  @ContentChild(DownloadIconDirective, {static: false}) public icon: DownloadIconDirective;

  public constructor(private sanitizer: DomSanitizer) { }
}
