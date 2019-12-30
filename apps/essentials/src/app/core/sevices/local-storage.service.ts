import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  public set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  public get(key: string): any {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }

  public remove(key: string): void {
    try {
      return localStorage.removeItem(key);
    } catch (e) {
      console.error('Error removing data from localStorage', e);
      return null;
    }
  }
}
