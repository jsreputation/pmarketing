import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input()
  public showBackButton = false;

  constructor(private location: Location){}

  public ngOnInit(): void {}

  public onLeftActionClick(): void {
    this.location.back();
  } 
}
