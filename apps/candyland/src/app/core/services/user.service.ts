import { Injectable } from '@angular/core';
import { LocalStorageService } from '@cl-core/services/local-storage.service';
import { BehaviorSubject } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject$: BehaviorSubject<any>;

  constructor(private localStorage: LocalStorageService) {
    const localUserId = this.localStorage.get('userId');
    if (localUserId) {

    }
    this.userSubject$ = new BehaviorSubject<any>(localToken);
  }

  public set user(user: any) {
    this.userSubject$.next(user);
  }

  public get user(): any {
    return this.userSubject$.value;
  }

  public get user$(): any {
    return this.userSubject$.asObservable().pipe(
      share()
    );
  }

  public get userId(): any {
    return this.userSubject$.value ? this.userSubject$.value.id : null;
  }

}
