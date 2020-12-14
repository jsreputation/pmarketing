import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlagLocalStorageService {

  constructor() { }

  public setFlagInLocalStroage(flag: string, value: string): void {
      localStorage.setItem(flag, value);
  }

  public resetFlagInLocalStroage(flag: string): void {
    if (localStorage.getItem(flag)) {
      localStorage.removeItem(flag);
    }
  }

}
