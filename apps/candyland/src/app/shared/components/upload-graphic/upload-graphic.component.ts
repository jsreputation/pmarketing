import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'cl-upload-graphic',
  templateUrl: './upload-graphic.component.html',
  styleUrls: ['./upload-graphic.component.scss']
})
export class UploadGraphicComponent implements OnInit {
  public imagePath;
  public imgURL: any;
  public message: string;

  constructor(private sanitizer: DomSanitizer,
              private cd: ChangeDetectorRef) {}

  public preview(files): void {
    if (files.length === 0) {
      return;
    }

    let mimeName = files[0].name;
    if (!(/\.(jpg|jpeg|png)$/i).test(mimeName)) {
      this.message = "Only .JPG or .PNG are supported.";
      return;
    }

    let reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = this.sanitizeUrl(reader.result);
      this.cd.markForCheck();
    }
  }

  public sanitizeUrl(data): any {
    return this.sanitizer.bypassSecurityTrustUrl(data);
  }

  ngOnInit(): void {
  }

}
