import {Component, forwardRef, Inject} from '@angular/core';
import {FormArray, FormControl, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'cl-multi-upload-dialog',
  templateUrl: './multi-upload-dialog.component.html',
  styleUrls: ['./multi-upload-dialog.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiUploadDialogComponent ),
      multi: true
    }
  ]
})
export class MultiUploadDialogComponent  {
  // tslint:disable-next-line:variable-name
  private readonly _matDialogRef: MatDialogRef<MultiUploadDialogComponent>;
  // at first not present, if present dont overwrite
  public formImgs: FormGroup = new FormGroup({
    imagesFormArray: new FormArray([])
  });
  public imageGraphicWithNestedGraphic: IGraphic | undefined; // to be transformed into this
  public imageSegments!: {[key: string]: boolean}; // more generic, highlight number of upload controls
  public placeHolder: string;

  public get imgArray(): FormArray {
    return (this.formImgs.get('imagesFormArray') as FormArray);
  }

  public get imageSegKVPairs(): [string, boolean][] {
    if (this.imageSegments) {
      return Object.entries(this.imageSegments);
    }
  }
  constructor(matDialogRef: MatDialogRef<MultiUploadDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data: { img: IGraphic, imgSegments: {[key: string]: boolean}, placeHolder: string}) {
    this._matDialogRef = matDialogRef;
    this.imageSegments = data.imgSegments;
    let imageGraphicAsArray;
    if (data.img) {
      this.imageGraphicWithNestedGraphic = data.img;
      // array of images url, first one is the compulsory one
      imageGraphicAsArray = [data.img.img];
      if (data.img.imageParts) {
        imageGraphicAsArray = [...imageGraphicAsArray, ...data.img.imageParts.map(image => image.img)];
      }
    }
    this.placeHolder = data.placeHolder;
    if (this.imageSegKVPairs) {
      (this.formImgs.get('imagesFormArray') as FormArray).controls =
        this.imageSegKVPairs.map((_: [string, boolean], index) => new FormControl(
          data.img ? imageGraphicAsArray[index] : null)); // default cant access index get undefined, i see it the same as null
    }
  }

  public close(imageGraphicWithNestedGraphic?: IGraphic): void {
    this._matDialogRef.close(imageGraphicWithNestedGraphic);
  }

  public confirm(): void {
    // note index 0 for main image and 1,2,3..
    // use is in the template [imgURL]="i === 0 ? imageGraphicWithNestedGraphic.img : imageGraphicWithNestedGraphic.imageParts[i].img"
    const IGraphicArray = Object.keys(this.imageSegments).map((key, index) => {
      if (this.imgArray.controls[index].value) {
        return {
          id: index,
          type: key,
          active: false,
          img: this.imgArray.controls[index].value};
      }
    }
    ).filter(graphObj => graphObj);
    if (IGraphicArray.length >= 2) {
      this.imageGraphicWithNestedGraphic = {...IGraphicArray[0], imageParts: IGraphicArray.slice(1)};
    } else {
      this.imageGraphicWithNestedGraphic = {...IGraphicArray[0]};
    }
    this.close(this.imageGraphicWithNestedGraphic);
  }

}
