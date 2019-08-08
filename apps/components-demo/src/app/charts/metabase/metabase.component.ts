import { Component } from '@angular/core';

@Component({
  selector: 'app-metabase',
  templateUrl: './metabase.component.html',
  styleUrls: ['./metabase.component.scss']
})
export class MetabaseComponent {
  public params: { [key: string]: string };

  constructor() {
    this.params = {
      start_date: '2019-07-01',
      end_date: '2019-08-31'
    };
  }
}
