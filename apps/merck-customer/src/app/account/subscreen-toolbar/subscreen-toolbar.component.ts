import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'mc-subscreen-toolbar',
  templateUrl: './subscreen-toolbar.component.html',
  styleUrls: ['./subscreen-toolbar.component.scss']
})
export class SubscreenToolbarComponent implements OnInit {
  @Input() public title: string;

  constructor(
    private location: Location
  ) { }

  public ngOnInit(): void {
  }

  public goBack(): void {
    console.log('back');
    this.location.back();
  }
}
