import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class TokenService {
    private userToken$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    constructor(private localStorage: LocalStorageService) {
        this.userToken$ = new BehaviorSubject(this.localStorage.get('authToken')) || null;
    }

    public get(): string {
        return this.userToken$.getValue();
    }

    public set(value: any): any {
        this.userToken$.next(value);
    }

    public remove(): void {
        this.userToken$.complete();
    }
}
