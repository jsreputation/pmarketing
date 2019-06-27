import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'cl-tabs-filter',
  templateUrl: './tabs-filter.component.html',
  styleUrls: ['./tabs-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsFilterComponent implements OnInit {
  private _filterChanges$: BehaviorSubject<string>;
  config = [
    {
      type: 'all',
      count: 302,
      active: true
    },
    {
      type: 'ssss',
      count: 302,
      active: false
    },
    {
      type: 'ffff',
      count: 302,
      active: false
    }
  ];

  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this._filterChanges$ = new BehaviorSubject(this.config[0].type);
  }

  changeTab(tab) {
    this.config.map(currentTap => currentTap.active = currentTap.type === tab.type);
    // console.log('click', tab, this.config);
    this.cd.detectChanges();
    this._filterChanges$.next(tab.type);
  }

  public filterChanges(): Observable<string> {
    return this._filterChanges$.asObservable();
  }

}
