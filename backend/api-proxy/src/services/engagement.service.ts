import { IEngagementService } from './iengagement.service';
import { HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';
import { IListResponse, ISingleResponse } from './response.model';
import { IUpdateGame } from './game/game.service';
import { map } from 'rxjs/operators';
import { AxiosResponse } from 'axios';
import { IPostRequest, IPatchRequest } from './request.model';
import { IEngagement } from './engagement.model';
import { IncomingHttpHeaders } from 'http2';

export abstract class EngagementService<T extends IEngagement> implements IEngagementService {
    private baseUrl: string = 'https://api.whistler.perxtech.org';
    protected service: string;

    constructor(protected http: HttpService) { }

    public getEngagements(headers?: IncomingHttpHeaders): Observable<IListResponse<T>> {
        return this.http.get<IListResponse<T>>(`${this.baseUrl}/${this.service}/engagements`, { headers: this.getHeaders(headers) })
            .pipe(map((res: AxiosResponse<IListResponse<T>>) => res.data));
    }

    public getEngagement(id: number, headers?: IncomingHttpHeaders): Observable<ISingleResponse<T>> {
        return this.http.get<ISingleResponse<T>>(`${this.baseUrl}/${this.service}/engagements/${id}`, { headers: this.getHeaders(headers) })
            .pipe(map((res: AxiosResponse<ISingleResponse<T>>) => res.data));
    }

    public postEngagement(engagement: IPostRequest<IUpdateGame>, headers?: IncomingHttpHeaders): Observable<ISingleResponse<T>> {
        return this.http.post<ISingleResponse<T>>(
            `${this.baseUrl}/${this.service}/engagements`,
            engagement,
            { headers: this.getHeaders(headers) }
        )
            .pipe(map((res: AxiosResponse<ISingleResponse<T>>) => res.data));
    }

    public deleteEngagement(id: number, headers?: IncomingHttpHeaders): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${this.service}/engagements/${id}`, { headers: this.getHeaders(headers) })
            .pipe(map((res: AxiosResponse<void>) => res.data));
    }

    public patchEngagement(
        id: number,
        engagement: IPatchRequest<IUpdateGame>,
        headers?: IncomingHttpHeaders
    ): Observable<ISingleResponse<T>> {
        engagement.data.id = `${id}`;
        return this.http.patch<ISingleResponse<T>>(
            `${this.baseUrl}/${this.service}/engagements/${id}`,
            engagement,
            { headers: this.getHeaders(headers) }
        )
            .pipe(map((res: AxiosResponse<ISingleResponse<T>>) => res.data));
    }

    private getHeaders(headers?: IncomingHttpHeaders): { [key: string]: string | string[] } {
        const res: { [key: string]: string | string[] } = headers ? headers : {};
        // tslint:disable-next-line: forin
        for (const k in res) {
            const lowK = k.toLowerCase();
            if (k !== lowK) {
                res[lowK] = res[k];
                delete res[k];
            }
        }

        // if there is no token attach it
        if (!res.authorization) {
            res.authorization = 'Basic AALZIKJPKJHGIRETLLHV:8Rvq88InMaB3-Or_6U_pKsiTgjLf3kTo-E7xL3kmTvXGVIDrP8hF2A';
        }
        // remove the host header as it messes things up
        if (res.host) {
            delete res.host;
        }

        // force the content-type
        res['content-type'] = 'application/vnd.api+json';

        return res;
    }
}
