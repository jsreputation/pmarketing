import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-congrats',
  templateUrl: './congrats.component.html',
  styleUrls: ['./congrats.component.scss']
})
export class CongratsComponent implements OnInit {

  numRewards: number;

  constructor(private activateRouter: ActivatedRoute) { }

  ngOnInit() {
    this.activateRouter.queryParams.subscribe( params => {
      this.numRewards = params[`numRewards`];
    });
  }

}
