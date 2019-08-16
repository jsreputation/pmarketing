import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'perx-core-micro-profile',
  templateUrl: './micro-profile.component.html',
  styleUrls: ['./micro-profile.component.scss']
})

export class MicroProfileComponent implements OnInit {

  @Input()
  public name: string;

  public ngOnInit(): void {
  }

}
