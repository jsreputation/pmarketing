import { Component } from '@angular/core';
import { ISlice } from '@perx/core';

@Component({
  selector: 'app-spin',
  templateUrl: './spin.component.html',
  styleUrls: ['./spin.component.scss']
})
export class SpinComponent  {
  public mockSlices: ISlice[] = [
    {id: '1', label: 'abc', background_color: '#49875b', label_color: 'black'},
    {id: '2', label: 'bcd', background_color: '#f6ff80', label_color: 'blue'},
    {id: '3', label: 'cde', background_color: '#f578a4', label_color: 'black'},
    {id: '4', label: 'def', background_color: '#147dd3'},
    {id: '5', label: 'efg', background_color: '#7b1b9e', label_color: '#ffffff'},
    {id: '6', label: 'abc', background_color: '#9b99c7', label_color: 'green'},
    {id: '7', label: 'bcd', background_color: '#8c383e', label_color: '#ffffff'},
    {id: '8', label: 'cde', background_color: '#fca562', label_color: '#000000'},
    {id: '9', label: 'def', background_color: '#4ab5b0', label_color: '#000000'},
    {id: '10', label: 'efg', background_color: '#fc58b8', label_color: 'black'},
  ];
}
