import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'cl-question-type',
  templateUrl: './question-type.component.html',
  styleUrls: ['./question-type.component.scss']
})
export class QuestionTypeComponent implements OnInit, AfterViewInit {
  @ViewChild('matSelect', {static: true}) public matSelect: any;
  toppings = new FormControl();
  open = true;
  toppingList = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  constructor() { }

  toggle() {
    this.matSelect.open();
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    console.log(this.matSelect.trigger.nativeElement);
  }

}
