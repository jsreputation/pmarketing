import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
export class SelfDestruct implements OnDestroy {

  readonly destroy$: Subject<any> = new Subject<any>();
  ngOnDestroy() {
    this.destroy$.next('');
    this.destroy$.unsubscribe();
  }
}
