import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  public set user(user: any) {
    this.userSubject$.next(user);
  }

  public get user(): any {
    return this.userSubject$.value;
  }

  public get user$(): any {
    return this.userSubject$.asObservable();
  }

  public get userId(): any {
    return this.userSubject$.value ? this.userSubject$.value.id : null;
  }

  public get userName$(): any {
    return this.userSubject$.pipe(
      map(user => user ? user.username : null)
    );
  }

}
