import { Component, OnDestroy, OnInit } from '@angular/core';
import { distinctUntilChanged, takeUntil, debounceTime, map, tap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'cl-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit, OnDestroy {

  public searchControl: FormControl = new FormControl('', [
    // Validators.minLength(3)
  ]);
  private destroy$: Subject<void> = new Subject<void>();

  constructor() {
  }

  ngOnInit() {
    // listenSearchChanges
  }

  public ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  public filterChanges(): Observable<string> {
    return this.searchControl.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        tap(d => console),
        distinctUntilChanged(),
        debounceTime(500),
      );
  }
}
