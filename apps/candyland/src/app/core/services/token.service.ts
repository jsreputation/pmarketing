import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, skip } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class SessionService {

  public isActiveSession$;
  private authToken$: BehaviorSubject<any>;

  constructor(private localStorage: LocalStorageService) {
    const localToken = this.localStorage.get('authToken');
    this.authToken$ = new BehaviorSubject<any>(localToken);
    this.authToken$.pipe(skip(1)).subscribe((token) => {
      if (token) {
        this.localStorage.set('authToken', token);
      } else {
        this.localStorage.remove('authToken');
      }
    });
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
