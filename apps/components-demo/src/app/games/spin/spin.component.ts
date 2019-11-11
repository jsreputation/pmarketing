import { Component } from '@angular/core';
import { ISlice } from '@perx/core';

@Component({
  selector: 'app-spin',
  templateUrl: './spin.component.html',
  styleUrls: ['./spin.component.scss']
})
export class SpinComponent  {
  public mockSlices: ISlice[] = [
    {id: '1', label: 'abc', backgroundColor: '#49875b', labelColor: 'black'},
    {id: '2', label: 'bcd', backgroundColor: '#f6ff80', labelColor: 'blue'},
    {id: '3', label: 'cde', backgroundColor: '#f578a4', labelColor: 'black'},
    {id: '4', label: 'def', backgroundColor: '#147dd3'},
    {id: '5', label: 'efg', backgroundColor: '#7b1b9e', labelColor: '#ffffff'},
    {id: '6', label: 'abc', backgroundColor: '#9b99c7', labelColor: 'green'},
    {id: '7', label: 'bcd', backgroundColor: '#8c383e', labelColor: '#ffffff'},
    {id: '8', label: 'cde', backgroundColor: '#fca562', labelColor: '#000000'},
    {id: '9', label: 'def', backgroundColor: '#4ab5b0', labelColor: '#000000'},
    {id: '10', label: 'efg', backgroundColor: '#fc58b8', labelColor: 'black'},
  ];
}
