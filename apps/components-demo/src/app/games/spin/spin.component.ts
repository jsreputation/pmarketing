import { Component } from '@angular/core';
import { ISlice } from '@perx/core';

@Component({
  selector: 'app-spin',
  templateUrl: './spin.component.html',
  styleUrls: ['./spin.component.scss']
})
export class SpinComponent  {
  public mockSlices: ISlice[] = [
    {id: '1', label: 'abc', background_color: 'green', label_color: 'black'},
    {id: '2', label: 'bcd', background_color: 'yellow', label_color: 'blue'},
    {id: '3', label: 'cde', background_color: 'pink', label_color: 'black'},
    {id: '4', label: 'def', background_color: '#147dd3', label_color: 'black'},
    {id: '5', label: 'efg', background_color: 'purple', label_color: 'black'},
    {id: '6', label: 'abc', background_color: 'orange', label_color: 'green'},
    {id: '7', label: 'bcd', background_color: 'yellow', label_color: 'black'},
    {id: '8', label: 'cde', background_color: 'pink', label_color: 'white'},
    {id: '9', label: 'def', background_color: '#147dd3', label_color: 'black'},
    {id: '10', label: 'efg', background_color: 'purple', label_color: 'black'},
  ];
}
