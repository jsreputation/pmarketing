import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlagLocalStorageService {

  constructor() { }

  public setFlagInLocalStorage(flag: string, value: string): void {
      localStorage.setItem(flag, value);
  }

  public getFlagInLocalStorage(flag: string): string | null {
    return localStorage.getItem(flag);
  }

  public resetFlagInLocalStorage(flag: string): void {
    if (localStorage.getItem(flag)) {
      localStorage.removeItem(flag);
    }
  }

}
