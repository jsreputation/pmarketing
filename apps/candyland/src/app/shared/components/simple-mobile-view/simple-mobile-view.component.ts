import { Component, Input, ViewChild } from '@angular/core';
import { CreateImageDirective } from '@cl-shared/directives/create-image.directive';
import { Observable } from 'rxjs';

@Component({
  selector: 'cl-simple-mobile-view',
  templateUrl: './simple-mobile-view.component.html',
  styleUrls: ['./simple-mobile-view.component.scss']
})
export class SimpleMobileViewComponent {
  @ViewChild(CreateImageDirective, { static: false }) public createImagePreview: CreateImageDirective;
  @Input() public background: string = 'assets/images/reward/card-background/card-bg-1.png';
  @Input() public backgroundColor: string = null;
  @Input() public mobileImageClass: string = 'mobile-preview-mobile';
  @Input() public headerColor: string = '#ffffff';
  @Input() public primaryColor: string = null;
  @Input() public logo: string;
  @Input() public logoType: boolean = true;
  @Input() public fontFamily: string;

  public createPreview(): Observable<IUploadedFile> {
    return this.createImagePreview.getPreviewUrl();
  }

  // public getBackground(): string {
  //   return this.backgroundColor ? this.backgroundColor : `url(${this.background})`;
  // }
}
