import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class TokenService {
  private userToken$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private localStorage: LocalStorageService) {
    const localToken = this.localStorage.get('authToken') || null;
    if (!!localToken) {
      this.userToken$.next(localToken);
    }
  }

  public get token(): string {
    return this.userToken$.getValue();
  }

  public set token(value: string) {
    this.userToken$.next(value);
  }

  public remove(): void {
    this.userToken$.complete();
  }
}
