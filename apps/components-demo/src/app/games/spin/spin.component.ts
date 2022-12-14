import { Component } from '@angular/core';
import { ISlice } from '@perxtech/core';

@Component({
  selector: 'app-spin',
  templateUrl: './spin.component.html',
  styleUrls: ['./spin.component.scss']
})
export class SpinComponent {
  public pointers: string[] = [
    'http://cdn.perxtech.net/content/dashboard/pointer1.png',
    'http://cdn.perxtech.net/content/dashboard/pointer2.png',
    'http://cdn.perxtech.net/content/dashboard/pointer3.png'
  ];
  public wheels: string[] = [
    'http://cdn.perxtech.net/content/dashboard/wheel1.png',
    'http://cdn.perxtech.net/content/dashboard/wheel2.png',
    'http://cdn.perxtech.net/content/dashboard/wheel3.png',
  ];
  public pointerIndex: any = 0;
  public wheelIndex: any = 0;

  public get pointer(): string {
    return this.pointers[this.pointerIndex] || this.pointers[0];
  }

  public get wheel(): string {
    return this.wheels[this.wheelIndex] || this.wheels[0];
  }

  public mockSlices: ISlice[] = [
    {
      id: 0,
      backgroundColor: '#C2185B',
      label: 'France',
      labelColor: 'white',
    },
    {
      id: 1,
      backgroundColor: '#8BC34A',
      label: 'Belgium',
      labelColor: 'white'
    },
    {
      id: 2,
      backgroundColor: '#F8BBD0',
      // label: 'Netherlands',
      labelColor: '#212121',
      backgroundImage: 'http://cdn.perxtech.net/content/dashboard/post-stamp-2.png'
    },
    {
      id: 3,
      backgroundColor: '#C2185B',
      label: 'Germany',
      labelColor: 'white'
    },
    {
      id: 4,
      backgroundColor: '#8BC34A',
      label: 'Italy',
      labelColor: 'white'
    },
    {
      id: 5,
      backgroundColor: '#F8BBD0',
      // label: 'Austria',
      labelColor: '#212121',
      backgroundImage: 'http://cdn.perxtech.net/content/dashboard/post-stamp-2.png'
    },
    // {
    //   id: '3',
    //   backgroundColor: '#C2185B',
    //   label: 'Spain',
    //   labelColor: 'white'
    // },
    // {
    //   id: '4',
    //   backgroundColor: '#8BC34A',
    //   label: 'Portugal',
    //   labelColor: 'white'
    // },
    // {
    //   id: '5', label: 'Denmark',
    //   backgroundColor: '#F8BBD0',
    //   labelColor: '#212121'
    // }
  ];
}
