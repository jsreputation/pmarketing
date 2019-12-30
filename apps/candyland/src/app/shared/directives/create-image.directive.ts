import { Directive, ElementRef, Inject } from '@angular/core';
import * as html2canvas from 'html2canvas';
import { Options } from 'html2canvas';
import { WINDOW } from '@cl-core/services/window.service';
import { Observable, of } from 'rxjs';
import { UploadFileService } from '@cl-core-services';
import { fromPromise } from 'rxjs/internal-compatibility';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { IUploadedFile } from '@cl-core/models/upload-file/uploaded-file.interface';
@Directive({
  selector: '[clCreateImage]'
})
export class CreateImageDirective {

  constructor(private element: ElementRef,
              private uploadFileService: UploadFileService,
              @Inject(WINDOW) private window: Window) {
  }

  public getPreviewUrl(): Observable<IUploadedFile> {
    this.setPosition();
    return this.downloadImage()
      .pipe(
        switchMap((data: any) => {
          return this.uploadFileService.uploadImage(data)
            .pipe(
              tap(() => {
                this.hideShowScroll(false);
                this.switchBodyClass(false);
              })
            );
        }),
        catchError((error => {
          this.hideShowScroll(false);
          this.switchBodyClass(false);
          return of(error);
        }))
      );
  }

  private setPosition(): void {
    if (this.window && this.window.scrollTo) {
      this.window.scrollTo(0, 0);
      this.hideShowScroll(true);
      this.switchBodyClass(true);
    }
  }

  public downloadImage(): Observable<Blob> {
    const option: Partial<Options> = { useCORS: true, logging: true, allowTaint: true, removeContainer: false};
    const element: HTMLElement = (this.element.nativeElement as HTMLElement);
    this.patchImages(element);
    const htmlCanvas: any = html2canvas;
    return fromPromise(htmlCanvas(element, option))
      .pipe(
        map((canvas: HTMLCanvasElement) => this.b64toBlob(canvas.toDataURL('image/png')))
      );
  }

  private patchImages(el: ChildNode): void {
    if (el instanceof  HTMLImageElement) {
      el.crossOrigin = 'Anonymous';
      el.src = el.src ? `${el.src}?v=${new Date().getTime()}` : '';
    }
    el.childNodes.forEach(c => this.patchImages(c));
  }

  public b64toBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/jpeg' });
  }

  private hideShowScroll(isHide: boolean): void {
    this.window.document.body.style.overflow = isHide ? 'hidden' : 'auto';
  }

  private switchBodyClass(isAdd: boolean): void {
    if (isAdd) {
      this.window.document.body.classList.add('pren-screen');
      return;
    }
    this.window.document.body.classList.remove('pren-screen');
  }
}
