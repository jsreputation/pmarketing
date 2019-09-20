import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadImageComponent } from '@cl-shared/questions/question-picture-choice-field/upload-image/upload-image.component';

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
