import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-campaign-stamps-read-more',
  templateUrl: './campaign-stamps-read-more.component.html',
  styleUrls: ['./campaign-stamps-read-more.component.scss']
})
export class CampaignStampsReadMoreComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log("params: ", params)
    });
  }

}
