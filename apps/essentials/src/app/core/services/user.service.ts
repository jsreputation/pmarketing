import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAMUser } from '@es-core/models/auth/IAMUser.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject$: BehaviorSubject<IAMUser | null> = new BehaviorSubject<IAMUser | null>(null);

  public set user(user: IAMUser | null) {
    this.userSubject$.next(user);
  }

  public get user(): IAMUser | null {
    return this.userSubject$.value;
  }

  public get user$(): Observable<IAMUser | null> {
    return this.userSubject$.asObservable();
  }

  public get userId(): string | null {
    return this.userSubject$.value ? this.userSubject$.value.id : null;
  }

  public get userName$(): Observable<string | null> {
    return this.userSubject$.pipe(
      map(user => user ? user.username : null)
    );
  }

  // public get currency$(): Observable<string | null> {
  //   return this.userSubject$.pipe(
  //     map(user => user ? user.currency : null)
  //   );
  // }
}
