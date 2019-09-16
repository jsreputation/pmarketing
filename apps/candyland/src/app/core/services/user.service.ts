import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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

}
