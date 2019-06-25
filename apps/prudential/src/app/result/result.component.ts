import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  numRewards: number;

  constructor(private activateRouter: ActivatedRoute) { }

  ngOnInit() {
    this.activateRouter.queryParams.subscribe( params => {
      this.numRewards = params[`numRewards`];
    });
  }

}
