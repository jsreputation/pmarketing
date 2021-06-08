import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'perx-blackcomb-pages-plinko',
  templateUrl: './plinko.component.html',
  styleUrls: ['./plinko.component.scss']
})
export class PlinkoComponent implements OnInit {

  public backgroundImgUrl: string = 'https://cdn.perxtech.io/model_image/source/1636/henry-co-odukx8c2gg-unsplash-2f6d49c0-e4c1-4ad6-958f-c2d5bac82a9b.jpg';

  constructor() { }

  public ngOnInit(): void {
  }

}
