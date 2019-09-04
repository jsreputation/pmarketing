import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class TokenService {
    private userToken$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    constructor(private localStorage: LocalStorageService) {
        this.userToken$ = new BehaviorSubject(this.localStorage.get('authToken')) || null;
        // console.log(this.userToken$);
    }

    public get(): string {
        return this.userToken$.getValue();
    }

    public set(value: string): void {
        this.userToken$.next(value);
    }

    public remove(): void {
        this.userToken$.complete();
    }
}
