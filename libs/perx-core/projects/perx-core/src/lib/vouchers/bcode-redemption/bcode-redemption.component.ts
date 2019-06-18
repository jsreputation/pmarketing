import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'perx-core-bcode-redemption',
  templateUrl: './bcode-redemption.component.html',
  styleUrls: ['./bcode-redemption.component.css']
})
export class BcodeRedemptionComponent implements OnInit {

  bCode = `=TYHGV=WPLKN=
=XCNET=9Y32<=
=5YUFK=4UWKX=`;

  constructor() { }

  ngOnInit() {
  }

}
