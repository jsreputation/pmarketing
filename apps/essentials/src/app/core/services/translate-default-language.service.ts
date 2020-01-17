import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
// tslint:disable
@Injectable({
  providedIn: 'root'
})
export class TranslateDefaultLanguageService {
  private _defaultLanguage$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  public get defaultLanguage$(): Observable<string> {
    return this._defaultLanguage$
      .asObservable()
      .pipe(filter(Boolean));
  }

  public setDefaultLanguage(language: string): void {
    this._defaultLanguage$.next(language);
  }
}
