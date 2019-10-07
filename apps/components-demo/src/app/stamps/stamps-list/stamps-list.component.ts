import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wtf',
  templateUrl: './stamps-list.component.html',
  styleUrls: ['./stamps-list.component.scss']
})
export class StampsListComponent implements OnInit {
  public stampsArr = [
    {
      id: 1,
      type: 'engagements',
      links: {
        self: 'http://api-dev1.uat.whistler.perxtech.io/engagements/1'
      },
      attributes: {
        urn: 'urn:perx:loyalty::222222222:engagement/1',
        created_at: '2019-10-01T02:39:50.311Z',
        updated_at: '2019-10-01T02:39:50.311Z',
        title: 'Loyalty Card 1',
        description: 'description text',
        image_url: 'https://robohash.org/loyalty-card-1.png',
        properties: {},
        display_properties: {
          slots: [
            1,
            5
          ],
          title: 'Collect stamps',
          button: 'Button here',
          nb_of_slots: 5,
          pre_stamp_img_url: 'https://robohash.org/preStampImg.png',
          post_stamp_img_url: 'https://robohash.org/postStampImg.png',
          reward_pre_stamp_img_url: 'https://robohash.org/rewardPreStampImg.png',
          reward_post_stamp_img_url: 'https://robohash.org/rewardPostStampImg.png'
        }
      }
    },
    {
      id: 2,
      type: 'engagements',
      links: {
        self: 'http://api-dev1.uat.whistler.perxtech.io/engagements/1'
      },
      attributes: {
        urn: 'urn:perx:loyalty::222222222:engagement/1',
        created_at: '2019-10-01T02:39:50.311Z',
        updated_at: '2019-10-01T02:39:50.311Z',
        title: 'Loyalty Card 1',
        description: 'description text',
        image_url: 'https://robohash.org/loyalty-card-1.png',
        properties: {},
        display_properties: {
          slots: [
            1,
            5
          ],
          title: 'Collect stamps',
          button: 'Button here',
          nb_of_slots: 5,
          pre_stamp_img_url: 'https://robohash.org/preStampImg.png',
          post_stamp_img_url: 'https://robohash.org/postStampImg.png',
          reward_pre_stamp_img_url: 'https://robohash.org/rewardPreStampImg.png',
          reward_post_stamp_img_url: 'https://robohash.org/rewardPostStampImg.png'
        }
      }
    }
  ];

  public ngOnInit(): void {}

  public log(id): void {
    console.log(id);
  }
}
