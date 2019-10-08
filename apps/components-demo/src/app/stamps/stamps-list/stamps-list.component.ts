import { Component, OnInit } from '@angular/core';
import { IStampCard, StampCardState } from '@perx/core';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-wtf',
  templateUrl: './stamps-list.component.html',
  styleUrls: ['./stamps-list.component.scss']
})
export class StampsListComponent implements OnInit {
  public stampsArr: Observable<IStampCard[]> = of([
    {
      id: 1,
      title: 'Collect stamps',
      subTitle: 'Button here',
      state: StampCardState.active,
      campaignConfig: {
        totalSlots: 5,
      },
      displayProperties: {
        cardBgImage: 'https://robohash.org/preStampImg.png'
      }
    },
    {
      id: 2,
      title: 'Loyalty Card 1',
      subTitle: 'description text',
      state: StampCardState.active,
      displayProperties: {
        cardBgImage: 'https://robohash.org/loyalty-card-1.png'
      },
      campaignConfig: {
        totalSlots: 5
      }
    }
  ]);

  public ngOnInit(): void { }

  public log(id): void {
    console.log(id);
  }
}
