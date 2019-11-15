import { TranslateLoader } from '@ngx-translate/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ConfigService, TokenStorage } from '@perx/core';

interface IDictionary {
    [k: string]: string;
}

@Injectable()
export class CustomTranslateLoader implements TranslateLoader {
    private contentHeader: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    });
    private hostUrl: string = 'http://localhost:4000/';
    constructor(
        private httpClient: HttpClient,
        private configService: ConfigService,
        private tokenStorage: TokenStorage
    ) {
        this.configService.readAppConfig().subscribe((config) => {
            if (config.production) {
                this.hostUrl = `${config.baseHref}`;
            }
        });
    }
    public getTranslation(lang: string): Observable<IDictionary> {
        const apiAddress = `${this.hostUrl}lang?default=${lang}`;
        return forkJoin([this.httpClient.get<IDictionary>(
            apiAddress, { headers: this.contentHeader, observe: 'response' }),
        this.httpClient.get<IDictionary>(`/assets/i18n/${lang}.json`, { headers: this.contentHeader, observe: 'response' })])
            .pipe(
                tap((res: HttpResponse<IDictionary>[]) => {
                    const backendRes = res.find((response) => response.url === apiAddress);
                    const l: string | null = backendRes ? backendRes.headers.get('content-language') : null;
                    this.tokenStorage.setAppInfoProperty(l || lang, 'lang');
                }),
                map((response: HttpResponse<IDictionary>[]) => {
                    response.sort((elemA) => elemA.headers.get('content-language') ? -1 : 1);
                    return Object.assign(response[1].body, response[0].body);
                }),
                catchError(() => this.httpClient.get<IDictionary>(`${this.hostUrl}assets/en-json.json`)),
                map((res: IDictionary | null) => res !== null ? res : {})
            );
    }
}
