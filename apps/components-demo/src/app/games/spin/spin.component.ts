import { Component } from '@angular/core';
import { ISlice } from '@perx/core';

@Component({
  selector: 'app-spin',
  templateUrl: './spin.component.html',
  styleUrls: ['./spin.component.scss']
})
export class SpinComponent  {
  public mockSlices: ISlice[] = [
    {
      id: '1',
      backgroundColor: 'red',
      label: 'red',
      backgroundImage: 'https://cdn.uat.whistler.perxtech.io/dev1/global/assets/stamps/post-stamp-2.png'
    },
    {
      id: '2',
      backgroundColor: 'green',
      label: 'green'
    },
    {
      id: '3',
      backgroundColor: 'blue',
      label: 'blue',
      backgroundImage: 'https://cdn.uat.whistler.perxtech.io/dev1/global/assets/stamps/post-stamp-2.png'
    },
    {
      id: '4',
      backgroundColor: 'yellow',
      label: 'yellow'
    },
    {
      id: '1',
      backgroundColor: 'purple',
      label: 'purple',
      backgroundImage: 'https://cdn.uat.whistler.perxtech.io/dev1/global/assets/stamps/post-stamp-2.png'
    },
    {
      id: '2',
      backgroundColor: 'pink',
      label: 'pink'
    },
    {
      id: '3',
      backgroundColor: 'blue',
      label: 'blue',
      backgroundImage: 'https://cdn.uat.whistler.perxtech.io/dev1/global/assets/stamps/post-stamp-2.png'
    },
    {
      id: '4',
      backgroundColor: 'white',
      label: 'white'
    },
    {id: '5', label: 'efg', backgroundColor: 'lightgreen', labelColor: 'lightgreen'},
    {id: '6', label: 'abc', backgroundColor: 'black', labelColor: 'black'}
    // {id: '7', label: 'bcd', backgroundColor: '#8c383e', labelColor: '#ffffff'},
    // {id: '8', label: 'cde', backgroundColor: '#fca562', labelColor: '#000000'},
    // {id: '9', label: 'def', backgroundColor: '#4ab5b0', labelColor: '#000000'},
    // {id: '10', label: 'efg', backgroundColor: '#fc58b8', labelColor: 'black'},
  ];
}
