import { Component } from '@angular/core';
import { ISlice } from '@perxtech/core';

@Component({
  selector: 'app-spin',
  templateUrl: './spin.component.html',
  styleUrls: ['./spin.component.scss']
})
export class SpinComponent {
  public pointers: string[] = [
    'http://perx-cdn.s3.amazonaws.com/content/dashboard/pointer1.png',
    'http://perx-cdn.s3.amazonaws.com/content/dashboard/pointer2.png',
    'http://perx-cdn.s3.amazonaws.com/content/dashboard/pointer3.png'
  ];
  public wheels: string[] = [
    'http://perx-cdn.s3.amazonaws.com/content/dashboard/wheel1.png',
    'http://perx-cdn.s3.amazonaws.com/content/dashboard/wheel2.png',
    'http://perx-cdn.s3.amazonaws.com/content/dashboard/wheel3.png',
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
      id: '1',
      backgroundColor: '#C2185B',
      label: 'France',
      labelColor: 'white',
    },
    {
      id: '2',
      backgroundColor: '#8BC34A',
      label: 'Belgium',
      labelColor: 'white'
    },
    {
      id: '3',
      backgroundColor: '#F8BBD0',
      label: 'Netherlands',
      labelColor: '#212121',
      backgroundImage: 'http://perx-cdn.s3.amazonaws.com/content/dashboard/post-stamp-2.png'
    },
    {
      id: '4',
      backgroundColor: '#C2185B',
      label: 'Germany',
      labelColor: 'white'
    },
    {
      id: '1',
      backgroundColor: '#8BC34A',
      label: 'Italy',
      labelColor: 'white'
    },
    {
      id: '2',
      backgroundColor: '#F8BBD0',
      label: 'Austria',
      labelColor: '#212121'
    },
    {
      id: '3',
      backgroundColor: '#C2185B',
      label: 'Spain',
      labelColor: 'white'
    },
    {
      id: '4',
      backgroundColor: '#8BC34A',
      label: 'Portugal',
      labelColor: 'white'
    },
    {
      id: '5', label: 'Denmark',
      backgroundColor: '#F8BBD0',
      labelColor: '#212121'
    },
    // { id: '6', label: 'abc', backgroundColor: 'black', labelColor: 'black' }
    // {id: '7', label: 'bcd', backgroundColor: '#8c383e', labelColor: '#ffffff'},
    // {id: '8', label: 'cde', backgroundColor: '#fca562', labelColor: '#000000'},
    // {id: '9', label: 'def', backgroundColor: '#4ab5b0', labelColor: '#000000'},
    // {id: '10', label: 'efg', backgroundColor: '#fc58b8', labelColor: 'black'},
  ];
}
