import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public isActiveSession$: Observable<any>;
  private authToken$: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor() {
    this.isActiveSession$ = this.authToken$
      .pipe(
        map(token => !!token)
      );
  }

  public get token(): string {
    return this.authToken$.getValue();
  }

  public set token(value: string) {
    this.authToken$.next(value);
  }

  public remove(): void {
    this.authToken$.next(null);
  }
}
