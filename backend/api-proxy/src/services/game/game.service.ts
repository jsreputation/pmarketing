import { Injectable, HttpService } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { IListResponse, ISingleResponse } from '../response.model';
import { map } from 'rxjs/operators';
import { AxiosResponse } from 'axios';
import { IEngagement, IUpdateEngagement } from '../engagement.model';
import { IEngagementService } from '../iengagement.service';
import { IPostRequest, IPatchRequest } from '../request.model';

const enum GameType {
    spin = 'spin',
    tap = 'tap',
    shake = 'shake',
}

export type IShake = any;
export type ITree = any;

export interface IGame extends IEngagement {
    display_properties: IShake | ITree;
    game_type: GameType;
}

export interface IUpdateGame extends IEngagement {
    display_properties: IShake | ITree;
    game_type: GameType;
}

@Injectable()
export class GameService implements IEngagementService {
    private baseUrl: string = 'https://api-games.whistler.perxtech.org/game';
    constructor(private http: HttpService) { }

    public getEngagements(): Observable<IListResponse<IGame>> {
        return this.http.get<IListResponse<IGame>>(`${this.baseUrl}/engagements`, { headers: this.headers })
            .pipe(map((res: AxiosResponse<IListResponse<IGame>>) => res.data));
    }

    public getEngagement(id: number): Observable<ISingleResponse<IGame>> {
        return this.http.get<ISingleResponse<IGame>>(`${this.baseUrl}/engagements/${id}`, { headers: this.headers })
            .pipe(map((res: AxiosResponse<ISingleResponse<IGame>>) => res.data));
    }

    public postEngagement(engagement: IPostRequest<IUpdateGame>): Observable<ISingleResponse<IGame>> {
        return this.http.post<ISingleResponse<IGame>>(`${this.baseUrl}/engagements`, engagement, { headers: this.headers })
            .pipe(map((res: AxiosResponse<ISingleResponse<IGame>>) => res.data));
    }

    public deleteEngagement(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/engagements/${id}`, { headers: this.headers })
            .pipe(map((res: AxiosResponse<void>) => res.data));
    }

    public patchEngagement(id: number, engagement: IPatchRequest<IUpdateGame>): Observable<ISingleResponse<IGame>> {
        engagement.data.id = `${id}`;
        return this.http.patch<ISingleResponse<IGame>>(`${this.baseUrl}/engagements/${id}`, engagement, { headers: this.headers })
            .pipe(map((res: AxiosResponse<ISingleResponse<IGame>>) => res.data));
    }

    private get headers(): { [key: string]: string } {
        return {
            Authorization: 'Basic ADMHKPOTOGMOGZHNHTJY:tAP1jAJm_lCVPuwfOScHHW8ZvwYkiusrXeoQm2MAYSS4QHCRqAIsaQ',
            'Content-Type': 'application/vnd.api+json',
        };
    }
}
