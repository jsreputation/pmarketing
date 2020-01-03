import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAMUser } from '@es-core/models/auth/IAMUser.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject$: BehaviorSubject<IAMUser> = new BehaviorSubject<IAMUser>(null);

  public set user(user: IAMUser) {
    this.userSubject$.next(user);
  }

  public get user(): IAMUser {
    return this.userSubject$.value;
  }

  public get user$(): Observable<IAMUser> {
    return this.userSubject$.asObservable();
  }

  public get userId(): string {
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
