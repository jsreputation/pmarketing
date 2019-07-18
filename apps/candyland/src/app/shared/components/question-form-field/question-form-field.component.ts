import { Component, Input, OnInit } from '@angular/core';
import { QuestionFormFieldService } from '@cl-shared/components/question-form-field/shared/services/question-form-field.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'cl-question-form-field',
  templateUrl: './question-form-field.component.html',
  styleUrls: ['./question-form-field.component.scss']
})
export class QuestionFormFieldComponent implements OnInit {
  @Input() public group: FormGroup;
  @Input() public formGroup: FormGroup;
  @Input() public level: number;
  @Input() public currentIndex: number;
  public descriptionField: FormControl;
  public showDescription: boolean;
  public required = false;
  public closed = true;

  // test = [1, 2];
  constructor(private questionFormFieldService: QuestionFormFieldService, private fb: FormBuilder) {
  }

  public isActive() {
    return !this.questionFormFieldService.getFocusedElem(this.currentIndex, this.level);
  }

  ngOnInit() {
    console.log('this.group', this.group);
    console.log('level', this.level);
    console.log('currentIndex', this.currentIndex);
    this.createDescriptionControl();
    this.subscribeDescriptionControl();
  }

  public getTypeField(): AbstractControl {
    return this.group.get('selectedType');
  }

  public remove() {

  }

  public choseTypeQuestion(selectedTypeQuestion: IEngagementType): void {
    console.log(selectedTypeQuestion);
  }

  private createDescriptionControl(): void {
    this.descriptionField = this.fb.control(null);
  }

  private subscribeDescriptionControl(): void {
    this.descriptionField
      .valueChanges
      .pipe()
      .subscribe(value => {
        console.log('if true show discription and add control to the form', value);
        this.showDescription = value;
        this.toggleControl('description', value);
      });
  }

  private toggleControl(name: string, toggle: boolean): void {
    toggle
      ? this.group.setControl(name, this.questionFormFieldService.getSimpleControl())
      : this.group.removeControl(name);
    this.group.updateValueAndValidity();
  }
}
