import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ILocation } from '@perx/core';
import { test1 } from '../mock';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public locations: Observable<ILocation[]>;

  public ngOnInit(): void {
    this.locations = of(test1);
  }
}
