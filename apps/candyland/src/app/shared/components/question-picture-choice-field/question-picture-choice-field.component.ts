import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadImageComponent } from '@cl-shared/components/question-picture-choice-field/upload-image/upload-image.component';

@Component({
  selector: 'cl-question-picture-choice-field',
  templateUrl: './question-picture-choice-field.component.html',
  styleUrls: ['./question-picture-choice-field.component.scss']
})
export class QuestionPictureChoiceFieldComponent {
  @Input() public group: FormGroup;
  constructor(private fb: FormBuilder) { }

  public get choices(): FormArray {
    return (this.group.get('choices') as FormArray);
  }

  public removeControl(index: number): void {
    this.choices.removeAt(index);
  }

  public selectUploadGraphic(img: any, uploadImage: UploadImageComponent): void {
    this.choices.push(this.fb.group({
      text: [null, [Validators.required]],
      img_url: [img.changingThisBreaksApplicationSecurity, [Validators.required]]
      // img_url: ['https://steamcommunity-a.akamaihd.net/economy/image/64vD-vz99Gh75d0LDPB0xafxvGIGZ4JlqaTIjCBH3bwEDGn1UUnad4H8OQbqscapQVxvtTYJKVgNAeDPZm67hkn8y_2GP3s/256fx256f', [Validators.required]]
    }));
    uploadImage.clear();
  }

  public addedField(input: HTMLInputElement): void {
    this.choices.push(this.fb.group({
      text: [input.value, [Validators.required]],
      img_url: [null, [Validators.required]]
    }));
    input.value = '';
  }

}
