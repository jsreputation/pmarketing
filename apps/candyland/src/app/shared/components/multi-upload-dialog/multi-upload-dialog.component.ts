import { Component} from '@angular/core'; // ChangeDetectorRef,  OnInit
// , forwardRef
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
// import {UploadFileService} from '@cl-core-services';
// import {IUploadedFile} from '@cl-core/models/upload-file/uploaded-file.interface';
// import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'cl-multi-upload-dialog',
  templateUrl: './multi-upload-dialog.component.html',
  styleUrls: ['./multi-upload-dialog.component.scss'],
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     useExisting: forwardRef(() => MultiUploadDialogComponent ),
  //     multi: true
  //   }
  // ]
})
export class MultiUploadDialogComponent  { // implements ControlValueAccessor
  public imgURL: any;
  public loadedImg: boolean = false;
  public message: string;

  constructor(private sanitizer: DomSanitizer,
            ) { } //   private uploadFileService: UploadFileService,
  // private cd: ChangeDetectorRef

  public sanitizeUrl(data: any): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(data);
  }

  // private uploadImage(file: File): void {
  //   this.uploadFileService.uploadImage(file)
  //     .subscribe((res: IUploadedFile) => {
        //   this.imgURL = res.url;
        //   this.loadedImg = true;
        //   this.setSelectedGraphic(res.url);
        //   this.message = null;
        //   this.cd.markForCheck();
        // },
        // (err: Error) => {
        //   this.setError('Image haven\'t loaded successfully!', err.message);
        //   this.cd.markForCheck();
        // });
  // }

  // private setError(message: string, serverError?: string) {
  //   this.onTouched();
  //   this.loadedImg = false;
  //   this.setSelectedGraphic(null);
  //   this.message = message;
  //   if (serverError) {
  //     console.warn(serverError);
  //   }
  // }

  // public preview(files): void {
  //   this.message = null;
  //   if (files.length === 0) {
  //     this.setError('Empty file.');
  //     return;
  //   }
  //
  //   const mimeName = files[0].name;
  //   if (!(/\.(jpg|jpeg|png|gif)$/i).test(mimeName)) {
  //     this.setError('Only .JPG, .PNG or .GIF are supported.');
  //     return;
  //   }
  //   this.imagePath = files;
  //   this.uploadImage(files[0]);
  // }

}
