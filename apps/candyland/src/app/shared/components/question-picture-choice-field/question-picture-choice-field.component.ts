import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadImageComponent } from '@cl-shared/components/question-picture-choice-field/upload-image/upload-image.component';

@Component({
  selector: 'cl-question-picture-choice-field',
  templateUrl: './question-picture-choice-field.component.html',
  styleUrls: ['./question-picture-choice-field.component.scss']
})
export class QuestionPictureChoiceFieldComponent implements OnInit {
  @Input() public group: FormGroup;
  constructor(private fb: FormBuilder) { }

  public get choice(): FormArray {
    return (this.group.get('picture') as FormArray);
  }

  public removeControl(index: number): void {
    this.choice.removeAt(index);
  }

  public selectUploadGraphic(img: any, uploadImage: UploadImageComponent): void {
    this.choice.push(this.fb.group({
      text: [null, [Validators.required]],
      image: [img.changingThisBreaksApplicationSecurity, [Validators.required]]
    }));
    uploadImage.clear();
  }

  public addedField(input: HTMLInputElement): void {
    this.choice.push(this.fb.group({
      text: [input.value, [Validators.required]],
      image: [null, [Validators.required]]
    }));
    input.value = '';
  }

}
